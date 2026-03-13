import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart } from "./redux/cartSlice";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useNavigate } from "react-router-dom";

export default function Cart({ setOpen }) {

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const total = cartItems.reduce(
        (sum, item) =>
            sum + (Number(item.price) * Number(item.quantity || 1)),
        0
    );

    return (

        <div className="cart absolute right-2 md:right-5 top-16 md:top-20 z-50 bg-white p-4 md:p-5 h-fit w-[90vw] md:w-[400px] max-h-[400px] overflow-y-auto shadow-xl rounded-xl shadow-gray-600">

            <h1 className="text-2xl md:text-4xl font-bold text-[#24003e] pb-5">
                Products in your Cart
            </h1>

            {cartItems.map((item) => (

                <div
                    className="bg-[#e8f3f1] border mt-2 rounded-lg p-3 flex gap-3 items-center"
                    key={item.id}
                >

                    {/* IMAGE */}
                    <div className="h-[70px] w-[70px] md:h-[100px] md:w-[100px] flex-shrink-0">
                        <img
                            src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                            alt={item.title}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1">

                        <div className="text-lg md:text-xl font-bold text-[#24003e]">
                            {item.title}
                        </div>

                        <div className="text-sm md:text-lg font-semibold text-[#24003e]">
                            {item.quantity} X ₹{item.price}
                        </div>

                    </div>

                    {/* DELETE BUTTON */}
                    <DeleteOutlineOutlinedIcon
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="hover:text-red-700 cursor-pointer"
                    />

                </div>

            ))}

            {/* SUBTOTAL */}

            <div className="flex justify-between text-lg md:text-xl font-bold text-[#24003e] mt-4 mb-3">
                <h1>SUBTOTAL</h1>
                <h1>₹{total}</h1>
            </div>

            {/* CHECKOUT BUTTON */}

            <div className="text-center mb-3">
                <button
                    className="bg-[#00c9b2] hover:bg-[#009987] p-2 w-full text-white rounded-md cursor-pointer"
                    onClick={() => {
                        navigate("/checkout");
                        setOpen(false);
                    }}
                >
                    Proceed to Checkout
                </button>
            </div>

            {/* RESET CART */}

            <p
                onClick={() => dispatch(resetCart())}
                className="text-red-700 cursor-pointer text-sm md:text-base"
            >
                Reset Cart
            </p>

        </div>

    );
}