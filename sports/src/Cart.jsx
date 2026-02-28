import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, resetCart, increaseQuantity, decreaseQuantity } from "./redux/cartSlice";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Navigate, useNavigate } from "react-router-dom";

export default function Cart() {

    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce(
        (sum, item) =>
            sum + (Number(item.price) * Number(item.quantity || 1)),
        0
    );

    const navigate=useNavigate();


    return (
        <div className="cart absolute max-h-[350px] overflow-y-auto right-5 top-20 z-10 bg-white p-5 h-fit w-[400px] shadow rounded-xl shadow-gray-600">
            <h1 className="text-4xl font-bold text-[#24003e] pb-5">
                Products in your Cart
            </h1>

            {cartItems.map((item) => (
                <div
                    className="container h-[150px] bg-[#e8f3f1] border bottom-2 mt-2 rounded-sm"
                    key={item.id}
                >
                    <div className="first flex gap-4 mt-4">
                        <div className="img-details h-[160px] w-[160px] pl-2">
                            <img
                                src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                                alt={item.title}
                            />
                        </div>

                        <div className="description w-[300px]">
                            <div className="img-title text-xl font-bold text-[#24003e] pb-1">
                                {item.title}
                            </div>

                            <div className="img-price text-xl font-bold text-[#24003e] pb-3">
                                {item.quantity} X ₹{item.price}
                            </div>
                        </div>

                        <div className="delete">
                            <DeleteOutlineOutlinedIcon
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="hover:text-red-700 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            ))}

            <div className="second flex justify-between text-xl font-bold text-[#24003e] mt-2 mb-2">
                <h1>SUBTOTAL</h1>
                <h1>₹{total}</h1>
            </div>

            <div className="third  cursor-pointer text-center p-2 mb-2">
                <button className="bg-[#00c9b2] hover:bg-[#009987] p-2 w-full cursor-pointer text-white" onClick={()=>{
                    navigate("/Checkout");
                }}>Proceed to Check</button>
            </div>

            <div className="fourth">
                <p
                    onClick={() => dispatch(resetCart())}
                    className="text-red-700 cursor-pointer"
                >
                    Reset Cart
                </p>
            </div>
        </div>
    );
}
