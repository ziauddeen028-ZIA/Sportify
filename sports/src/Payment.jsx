import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Payment() {

    const location = useLocation();
    const navigate = useNavigate();
    const { formData, cart, total } = location.state;

    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {

        // Basic validation
        if (cardNumber.length !== 16 || cvv.length !== 3) {
            alert("Invalid Card Details");
            return;
        }

        setLoading(true);

        // Fake Processing Delay
        setTimeout(async () => {

            const paymentSuccess = Math.random() > 0.2; // 80% success

            if (!paymentSuccess) {
                setLoading(false);
                alert("Payment Failed ❌ Try Again");
                return;
            }

            // If success → Create Order
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));

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
                        orderStatus: "paid",
                        ...formData
                    }
                })
            });

            const orderData = await orderRes.json();
            const orderId = orderData.data.id;

            for (let item of cart) {
                await fetch("http://localhost:1337/api/order-items", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        data: {
                            price: item.price,
                            quantity: item.quantity,
                            order: orderId,
                            product: item.id
                        }
                    })
                });
            }

            setLoading(false);
            alert("Payment Successful 🎉");
            navigate("/myorders");

        }, 2500); // 2.5 seconds fake processing
    };

    if (!location.state) {
        navigate("/");
        return null;
    }
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">

            <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

                <h2 className="text-2xl font-bold mb-6 text-center">
                    Secure Card Payment
                </h2>

                <p className="mb-4 text-center font-semibold">
                    Amount: ₹{total}
                </p>

                <input
                    type="text"
                    placeholder="Card Number (16 digits)"
                    maxLength="16"
                    className="border w-full p-2 mb-4 rounded"
                    onChange={(e) => setCardNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="MM/YY"
                    className="border w-full p-2 mb-4 rounded"
                    onChange={(e) => setExpiry(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    className="border w-full p-2 mb-6 rounded"
                    onChange={(e) => setCvv(e.target.value)}
                />

                <button
                    onClick={handlePayment}
                    className="bg-[#00c9b2] hover:bg-[#009987] text-white w-full py-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Processing Payment..." : "Pay Now"}
                </button>

            </div>

        </div>
    );
}