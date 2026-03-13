import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "./redux/wishlistSlice";
import { toast } from "react-toastify";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Football() {

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*&filters[category][name][$eq]=football`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
                },
            }
        )
            .then(res => res.json())
            .then(data => setProducts(data.data));
    }, []);

    const detail = (id) => {
        navigate(`/singleproduct/${id}`);
    };

    return (
        <div className="px-4 md:px-10">

            <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6">
                FOOTBALL
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

                {products.map((item) => {

                    const isWishlisted = wishlistItems.some(w => w.id === item.id);

                    return (
                        <div
                            key={item.id}
                            onClick={() => detail(item.documentId)}
                            className="relative bg-white text-[#24003e] p-4 rounded-2xl shadow-xl hover:-translate-y-2 transition cursor-pointer"
                        >

                            {/* ❤️ Wishlist Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation(); // ⭐ IMPORTANT

                                    if (isWishlisted) {
                                        dispatch(removeFromWishlist(item.id));
                                        toast.warning("Removed from wishlist");
                                    } else {
                                        dispatch(addToWishlist({
                                            id: item.id,
                                            title: item.title,
                                            price: item.price,
                                            image: item.image
                                        }));
                                        toast.success("Added to wishlist ❤️");
                                    }
                                }}
                                className="absolute top-3 right-3 text-red-500 text-2xl z-10"
                            >
                                {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                            </button>

                            {/* PRODUCT IMAGE */}
                            <img
                                src={
                                    item.image?.url
                                        ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
                                        : "/no-image.png"
                                }
                                alt={item.title}
                                className="h-40 md:h-48 w-full object-contain mb-3"
                            />

                            {/* TITLE */}
                            <h4 className="font-semibold text-lg">
                                {item.title}
                            </h4>

                            {/* PRICE */}
                            <p className="font-bold">
                                ₹{item.price}
                            </p>

                            {/* BUTTON */}
                            <button className="mt-3 w-full bg-[#009987] hover:bg-[#24003e] text-white py-2 rounded">
                                MORE INFO
                            </button>

                        </div>
                    );
                })}

            </div>
        </div>
    );
}