import React, { useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        navigate(e.target.value);
    }

    const cartItems = useSelector((state) => state.cart.items);
    const wishlistItems = useSelector((state) => state.wishlist.items);


    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleLogout = () => {
        const isConfirmed = window.confirm("Do you want to Logout?");

        if (isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.info("Logged out");
            navigate("/login");
        }
    };

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div >
            <nav className="flex justify-between items-center p-5 bg-[#24003e] text-white ">
                <div className="left">
                    <h1 className="text-4xl font-bold cursor-pointer " onClick={() => navigate("/")}>Sportify</h1>
                </div>
                <div className="center  flex gap-10 " >
                    <Link to="/"> <h3 className="cursor-pointer hover:text-[#00c9b2]">HOME</h3></Link>

                    <h3 className="cursor-pointer hover:text-[#00c9b2]">


                        <label for="categories" className="brand"></label>
                        <select id="categories" name="categories" onChange={handleChange} >
                            <option value="" selected className="text-[#24003e] ">CATEGORIES</option>
                            <option value="/products" className="text-[#24003e] ">All </option>
                            <option value="/football" className="text-[#24003e] "> FOOTBALL</option>
                            <option value="/cricket" className="text-[#24003e] " >CRICKET</option>
                            <option value="/indoor" className="text-[#24003e] " >INDOOR</option>
                        </select>


                    </h3>

                    <Link to="/products"><h3 className="cursor-pointer hover:text-[#00c9b2]">PRODUCTS</h3></Link>
                </div>
                <div className="right  flex gap-10 ">
                    <div className="login cursor-pointer  ">
                        {!token ? (
                            <Link to="/login" className="">
                                LOGIN
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="font-semibold text-2xl text-[#00c9b2]">
                                    Hello, {user?.username?.toUpperCase() || "USER"}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="text-red-500 cursor-pointer"
                                >
                                    <LogoutIcon />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="profile  hover:text-[#00c9b2]">
                        {token && (
                            <button className="cursor-pointer" onClick={() => navigate("/profile")}>
                                <AccountCircleIcon />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            if (!token) {
                                navigate("/login");
                            } else {
                                navigate("/wishlist");
                            }
                        }

                        }
                        className="relative favorite cursor-pointer hover:text-pink-500"
                    >
                        <FavoriteBorderIcon />

                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 text-[12px] w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        )}
                    </button>

                    <button className="relative cart cursor-pointer hover:text-[#00c9b2]"
                        onClick={() => {
                            if (!token) {
                                navigate("/login");
                            } else {
                                setOpen(!open)
                            }
                        }

                        }
                    >

                        <ShoppingCartOutlinedIcon />

                        {totalQuantity > 0 && (
                            <span className="text-[14px] w-5 h-5 rounded-full bg-[#00c9b2] text-white absolute -right-2.5 -top-2.5 flex items-center justify-center">
                                {totalQuantity}
                            </span>
                        )}


                    </button>


                </div>
            </nav>
            {open && <Cart />}
            <Outlet />
        </div>
    );
}