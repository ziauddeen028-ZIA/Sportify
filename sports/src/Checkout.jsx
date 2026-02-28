import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "./redux/cartSlice";
import { toast } from "react-toastify";

export default function Checkout() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // ✅ Get cart from Redux
    const cart = useSelector((state) => state.cart.items);

    const total = cart.reduce(
        (sum, item) => sum + Number(item.price) * Number(item.quantity),
        0
    );

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        country: ""
    });

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const placeOrder = async () => {

        if (cart.length === 0) {
            alert("Cart is empty");
            return;
        }

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
                        orderStatus: "pending",
                        ...formData
                    }
                })
            });

            const orderData = await orderRes.json();

            if (!orderRes.ok) {
                console.log(orderData);
                alert("Order creation failed");
                return;
            }

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
                            product: item.id,

                        }
                    })
                });
            }
            dispatch(resetCart()); // ✅ clear redux cart

            toast.success("Order Placed Successfully 🔥");

            navigate("/myorders");

        } catch (error) {
            console.log(error);
            alert("Server Error");
        }
    };

    return (
        <div className="p-10">

            <h2 className="text-3xl font-bold mb-5">Checkout</h2>

            <div className="grid grid-cols-2 gap-5 mb-5">
                <input name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2" required />
                <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="border p-2" required />
                <input name="address" placeholder="Address" onChange={handleChange} className="border p-2" required />
                <input name="city" placeholder="City" onChange={handleChange} className="border p-2" required />
                <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2" required />
                <input name="state" placeholder="State" onChange={handleChange} className="border p-2" required />
                <input name="country" placeholder="Country" onChange={handleChange} className="border p-2" required />
            </div>

            <h3 className="text-xl font-bold mb-3">Total: ₹{total}</h3>

            <button className="bg-[#00c9b2] hover:bg-[#009987] p-2 w-1/4 cursor-pointer text-white"
                onClick={() =>
                    navigate("/payment", {
                        state: { formData, cart, total }
                    })
                }
            >
                Proceed to Payment
            </button>

        </div>
    );
}