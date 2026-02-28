import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import Football from "./Football";
import userimg from "../src/assets/images/user.jpg";



export default function Profile() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, []);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");

            const res = await fetch(
                `${import.meta.env.VITE_STRAPI_URL}/api/orders?populate=${user?.id}&populate=order_items`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await res.json();
            setOrders(data.data);
        };

        fetchOrders();
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="container flex justify-center items-center mt-7">

            <div className=" h-105 w-90 bg-white p-5 pb-5 rounded-2xl shadow-[10px_10px_10px_rgba(0,0,0,0.25)]">
                <h1 className="text-4xl font-bold text-center mb-3 text-[#24003e]">MY PROFILE</h1>
                <div className="img-container flex justify-center">
                    <img
                        src={userimg}
                        alt="Default Profile"
                        className=" w-32 h-32 rounded-full object-cover bg-gray-200 "
                    />
                </div>
                <div className="details">
                    <p className="text-2xl p-2">
                        Name : {user?.username}
                    </p>

                    <p className="text-2xl p-2">
                        UID : {user?.id}
                    </p>

                    <p className="text-2xl p-2 mb-2">
                        Email : {user?.email}
                    </p>
                </div>
                <div className="order text-center ">
                    <button onClick={()=>{
                        navigate("/myorders")
                    }} className="w-full bg-[#009987] hover:bg-[#24003e] cursor-pointer text-white p-2 rounded-xl mb-4">My Orders</button>
                </div>

            </div>
        </div>

    );
}