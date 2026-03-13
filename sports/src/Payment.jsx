import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "./redux/cartSlice";

export default function Payment() {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { formData, cart, total } = location.state || {};

    const [method, setMethod] = useState("upi");
    const [upiId, setUpiId] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    if (!location.state) {
        navigate("/");
        return null;
    }

    const updateStock = async (productId, currentStock, quantityPurchased) => {
        try {
            await fetch(`${import.meta.env.VITE_STRAPI_URL}/api/products/${productId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
                },
                body: JSON.stringify({
                    data: {
                        stock: currentStock - quantityPurchased
                    }
                })
            });
        } catch (err) {
            console.error("Stock update error:", err);
        }
    };

    const handlePayment = async () => {

        // 🔹 Validation
        if (method === "upi" && !upiId.includes("@")) {
            alert("Enter valid UPI ID");
            return;
        }

        if (method === "card" && (cardNumber.length !== 16 || cvv.length !== 3)) {
            alert("Invalid Card Details");
            return;
        }

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!token || !user) {
            alert("User not logged in");
            return;
        }

        setLoading(true);

        setTimeout(async () => {

            try {
                // 1️⃣ Create Order
                const orderRes = await fetch("http://localhost:1337/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        data: {
                            user: user.id,
                            totalAmount: total,
                            orderStatus: method === "cod" ? "pending" : "paid",
                            paymentMethod: method,
                            ...formData
                        }
                    })
                });

                const orderData = await orderRes.json();

                if (!orderRes.ok) {
                    console.log("STRAPI ERROR FULL:", orderData.error);
                    throw new Error("Order creation failed");
                }

                const orderId = orderData.data.id;

                // 2️⃣ Create Order Items
                for (let item of cart) {
                    const itemRes = await fetch("http://localhost:1337/api/order-items", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            data: {
                                price: item.price,
                                quantity: item.quantity,
                                order: {
                                    connect: [orderId]
                                },
                                product: {
                                    connect: [item.id]
                                }
                            }
                        })
                    });

                    if (!itemRes.ok) {
                        const errorData = await itemRes.json();
                        console.error("Order Item Error:", errorData);
                        throw new Error("Order item creation failed");
                    }
                }

                // 3️⃣ Update Stock
                for (let item of cart) {
                    await updateStock(item.id, item.stock, item.quantity);
                }

                dispatch(resetCart());

                setLoading(false);
                setSuccess(true);

                setTimeout(() => {
                    navigate("/myorders");
                }, 2000);

            } catch (error) {
                console.error("Payment Error:", error);
                setLoading(false);
                alert("Something went wrong. Check console.");
            }

        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-8">

            {/* LOADING / SUCCESS SCREEN */}

            {(loading || success) && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center z-50">

                    {!success ? (
                        <>
                            <div className="w-16 h-16 border-4 border-[#00c9b2] border-t-transparent rounded-full animate-spin"></div>

                            <p className="text-white text-xl mt-4 font-semibold">
                                Processing Payment...
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 bg-green-500 rounded-full flex justify-center items-center text-white text-3xl animate-pulse">
                                ✓
                            </div>

                            <p className="text-white text-xl mt-4 font-semibold">
                                Payment Successful 🎉
                            </p>
                        </>
                    )}

                </div>
            )}

            {/* MAIN PAYMENT LAYOUT */}

            <div className="flex flex-col md:flex-row gap-6">

                <div className="w-full md:w-1/3 bg-white p-6 rounded shadow h-fit">

                    <h3 className="text-xl font-bold mb-4">
                        Order Summary
                    </h3>

                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mb-2">

                            <span>{item.title}</span>

                            <span>₹{item.price}</span>

                        </div>
                    ))}

                    <hr className="my-3" />

                    <h3 className="font-bold text-lg">
                        Total: ₹{total}
                    </h3>

                </div>


                {/* PAYMENT METHODS */}

                <div className="w-full md:w-2/3 bg-white p-6 rounded shadow">

                    <h2 className="text-2xl font-bold mb-5">
                        Select Payment Method
                    </h2>

                    <label className="flex items-center gap-3 border p-3 rounded mb-3 cursor-pointer">

                        <input
                            type="radio"
                            value="upi"
                            checked={method === "upi"}
                            onChange={(e) => setMethod(e.target.value)}
                        />

                        UPI (Google Pay / PhonePe)

                    </label>

                    {method === "upi" && (
                        <input
                            type="text"
                            placeholder="Enter UPI ID (example@upi)"
                            className="border p-2 w-full mb-4"
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    )}

                    <label className="flex items-center gap-3 border p-3 rounded mb-3 cursor-pointer">

                        <input
                            type="radio"
                            value="card"
                            checked={method === "card"}
                            onChange={(e) => setMethod(e.target.value)}
                        />

                        Credit / Debit Card

                    </label>

                    {method === "card" && (
                        <div className="space-y-3 mb-4">

                            <input
                                type="text"
                                placeholder="Card Number (16 digits)"
                                maxLength="16"
                                className="border p-2 w-full"
                                onChange={(e) => setCardNumber(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="border p-2 w-full"
                                onChange={(e) => setExpiry(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="CVV"
                                maxLength="3"
                                className="border p-2 w-full"
                                onChange={(e) => setCvv(e.target.value)}
                            />

                        </div>
                    )}

                    <label className="flex items-center gap-3 border p-3 rounded mb-3 cursor-pointer">

                        <input
                            type="radio"
                            value="cod"
                            checked={method === "cod"}
                            onChange={(e) => setMethod(e.target.value)}
                        />

                        Cash On Delivery

                    </label>

                    <button
                        onClick={handlePayment}
                        className="bg-[#00c9b2] hover:bg-[#009987] text-white w-full py-3 rounded mt-5"
                    >
                        Pay ₹{total}
                    </button>

                </div>

                {/* ORDER SUMMARY */}


            </div>

        </div>
    );
}