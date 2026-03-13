import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, resetWishlist } from "./redux/wishlistSlice";
import { addToCart } from "./redux/cartSlice";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
    <div className="px-4 md:px-10 mt-10">

      {/* HEADER */}
      <div className="flex gap-3 items-center mb-6">

        <button
          onClick={() => navigate(-1)}
          className="p-3 bg-white cursor-pointer rounded-xl shadow"
        >
          <ArrowBackIcon />
        </button>

        <h1 className="text-3xl md:text-4xl font-bold">
          My Wishlist ❤️
        </h1>

      </div>

      {/* EMPTY */}
      {wishlistItems.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your Wishlist is Empty
        </p>
      ) : (
        <>

          {/* PRODUCTS GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {wishlistItems.map((item) => (

              <div
                key={item.id}
                className="bg-white rounded-xl shadow-xl p-4 text-center hover:-translate-y-1 transition"
              >

                {/* IMAGE */}
                <img
                  src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                  alt={item.title}
                  className="w-full h-40 object-contain"
                />

                {/* TITLE */}
                <h3 className="font-bold text-lg mt-3">
                  {item.title}
                </h3>

                {/* PRICE */}
                <p className="text-gray-700 mt-1">
                  ₹{item.price}
                </p>

                {/* BUTTONS */}
                <div className="mt-4 flex flex-col gap-2">

                  <button
                    onClick={() => {
                      dispatch(addToCart({
                        ...item,
                        quantity: 1
                      }));
                      toast.success("Item added to cart");
                    }}
                    className="bg-[#00c9b2] text-white py-2 rounded cursor-pointer"
                  >
                    Move to Cart
                  </button>

                  <button
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                    className="bg-red-500 text-white py-2 rounded cursor-pointer"
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