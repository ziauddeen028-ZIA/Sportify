import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "./redux/wishlistSlice";

export default function Indoor() {

    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*&filters[category][name][$eq]=indoor_sports`,
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
        <div>

            <h1 className="text-4xl font-bold mt-14 mb-5">
                INDOOR GAME
            </h1>

            <div className="flex justify-center items-center w-full">

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                    {products.map((item) => {

                        const isWishlisted = wishlistItems.some(w => w.id === item.id);

                        return (
                            <div
                                key={item.id}
                                className="relative bg-white p-4 rounded-2xl shadow-xl text-center cursor-pointer hover:-translate-y-2 transition"
                                onClick={() => detail(item.documentId)}
                            >

                                {/* ❤️ Wishlist */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

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
                                    className="absolute top-3 right-3 text-red-500 text-2xl"
                                >
                                    {isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </button>

                                <img
                                    src={
                                        item.image?.url
                                            ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
                                            : "/no-image.png"
                                    }
                                    alt={item.title}
                                    className="h-40 w-full object-contain mb-3"
                                />

                                <h4>{item.title}</h4>
                                <p>₹{item.price}</p>

                                <button className="bg-[#009987] text-white w-full mt-2 p-2 rounded">
                                    MORE INFO
                                </button>

                            </div>
                        );
                    })}

                </div>

            </div>
        </div>
    );
}