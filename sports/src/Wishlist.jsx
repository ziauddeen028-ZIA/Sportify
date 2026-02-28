import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, resetWishlist } from "./redux/wishlistSlice";
import { addToCart } from "./redux/cartSlice";
import { toast } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function Wishlist() {

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="container w-full px-10 mt-10 ">

      <div className="fav flex gap-2.5 items-center">
        <button onClick={() => {
          navigate(-1)
        }} className="p-3 bg-white ml-5 cursor-pointer rounded-xl shadow hover:shadow-black"><ArrowBackIcon /></button>
         <h1 className="text-4xl font-bold mb-8">My Wishlist ❤️</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-600 text-center">Your Wishlist is Empty</p>
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6 w-full ml-10">

            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className=" pt-4 pl-4 pr-4 pb-5 rounded-xl  bg-white text-center shadow-xl shadow-grey-300 hover:-translate-y-2  
             cursor-pointer transform transition duration-300 ease-in-out"
              >
                <img
                  src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                  alt={item.title}
                  className="h-50 w-full"
                />

                <h3 className="font-bold text-lg mt-3">
                  {item.title}
                </h3>


                <p className="text-gray-700 mt-1">
                  ₹{item.price}
                </p>


                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      dispatch(addToCart({
                        ...item,
                        quantity: 1
                      }));
                      toast.success("item added to cart");
                    }

                    }
                    className="bg-[#00c9b2] text-white px-3 py-1 rounded cursor-pointer"

                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* CLEAR BUTTON */}
          <div className="text-center mt-8">
            <button
              onClick={() => dispatch(resetWishlist())}
              className="text-red-600 font-bold cursor-pointer"
            >
              Clear Wishlist
            </button>
          </div>
        </>
      )}
    </div>
  );
}