import React, { useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Cart from "./Cart";
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";

export default function Navbar() {

    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // hamburger state

    const navigate = useNavigate();

    const handleChange = (e) => {
        navigate(e.target.value);
    };

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
        <div>

            <nav className="flex justify-between items-center p-4 md:p-5 bg-[#24003e] text-white">

                {/* LEFT */}
                <div className="flex items-center gap-3">

                    {/* Hamburger (mobile only) */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <MenuIcon />
                    </button>

                    <h1
                        className="text-2xl md:text-4xl font-bold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Sportify
                    </h1>

                </div>


                {/* CENTER MENU (desktop only) */}
                <div className="hidden md:flex gap-10">

                    <Link to="/">
                        <h3 className="cursor-pointer hover:text-[#00c9b2]">HOME</h3>
                    </Link>

                    <h3 className="cursor-pointer hover:text-[#00c9b2]">

                        <select
                            value=""
                            id="categories"
                            name="categories"
                            onChange={handleChange}
                            className="bg-[#24003e]"
                        >
                            <option value="">CATEGORIES</option>
                            <option value="/products">All</option>
                            <option value="/football">FOOTBALL</option>
                            <option value="/cricket">CRICKET</option>
                            <option value="/indoor">INDOOR</option>
                        </select>

                    </h3>

                    <Link to="/products">
                        <h3 className="cursor-pointer hover:text-[#00c9b2]">
                            PRODUCTS
                        </h3>
                    </Link>

                </div>


                {/* RIGHT */}
                <div className="flex items-center gap-5 md:gap-10">

                    <div className="login">

                        {!token ? (
                            <Link to="/login">LOGIN</Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <span className="hidden md:block font-semibold text-2xl text-[#00c9b2]">                                    Hello, {user?.username?.toUpperCase() || "USER"}
                                </span>

                                <button
                                    onClick={handleLogout}
                                    className="text-red-500"
                                >
                                    <LogoutIcon />
                                </button>
                            </div>
                        )}

                    </div>

                    {token && (
                        <button
                            onClick={() => navigate("/profile")}
                            className="hover:text-[#00c9b2]"
                        >
                            <AccountCircleIcon />
                        </button>
                    )}

                    <button
                        onClick={() => {
                            if (!token) {
                                navigate("/login");
                            } else {
                                navigate("/wishlist");
                            }
                        }}
                        className="relative hover:text-pink-500"
                    >
                        <FavoriteBorderIcon />

                        {wishlistItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 text-[12px] w-5 h-5 rounded-full bg-pink-600 text-white flex items-center justify-center">
                                {wishlistItems.length}
                            </span>
                        )}
                    </button>

                    <button
                        className="relative hover:text-[#00c9b2]"
                        onClick={() => {
                            if (!token) {
                                navigate("/login");
                            } else {
                                setOpen(!open);
                            }
                        }}
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


            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-[#24003e] text-white flex flex-col gap-4 p-4">

                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        HOME
                    </Link>

                    <select
                        onChange={(e) => {
                            handleChange(e);
                            setMenuOpen(false);
                        }}
                        className="bg-[#24003e]"
                    >
                        <option value="">CATEGORIES</option>
                        <option value="/products">All</option>
                        <option value="/football">FOOTBALL</option>
                        <option value="/cricket">CRICKET</option>
                        <option value="/indoor">INDOOR</option>
                    </select>

                    <Link to="/products" onClick={() => setMenuOpen(false)}>
                        PRODUCTS
                    </Link>

                </div>
            )}

            {open && <Cart setOpen={setOpen} />}

            <Outlet />

        </div>
    );
}