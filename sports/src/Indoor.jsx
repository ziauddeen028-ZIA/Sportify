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

    const navigate = useNavigate();

    const detail = (id) => {
        console.log("Clicked ID:", id);
        navigate(`/singleproduct/${id}`);
    };




    return (
        <div>
            <h1 className="text-4xl font-bold mt-14 mb-5">INDOOR GAME </h1>
            <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-3 gap-3 justify-around">
                    {  //this bracket for using js elements
                        products.map((item) =>
                            <div
                                key={item.id}
                                className="group relative h-80 w-70 bg-white text-[#24003e] p-4 shadow-2xl 
             shadow-gray-200 hover:-translate-y-2 rounded-2xl text-center 
             cursor-pointer transform transition duration-300 ease-in-out hover:block "
                                onClick={() => detail(item.documentId)}
                            >

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // 🔥 Prevent opening detail page

                                        const exists = wishlistItems.find(w => w.id === item.id);

                                        if (exists) {
                                            dispatch(removeFromWishlist(item.id));
                                            toast.warning("Removed from wishlist");
                                        } else {
                                            dispatch(addToWishlist({
                                                id: item.id,
                                                title: item.title,
                                                price: item.price,
                                                image: item.image
                                            }));
                                            toast.info("Added to wishlist ❤️");
                                        }
                                    }}
                                    className={`absolute top-3 right-3 text-2xl text-red-500 
                                        ${wishlistItems.some(w => w.id === item.id) ? "block" : "hidden group-hover:block"} cursor-pointer`} >
                                    {wishlistItems.some(w => w.id === item.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                </button>

                                {/* IMAGE */}
                                <img
                                    src={
                                        item.image?.url
                                            ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
                                            : "/no-image.png"
                                    }
                                    alt={item.title}
                                    className="h-50 w-70 mb-3"
                                />

                                <h4>{item.title}</h4>
                                <p>₹{item.price}</p>

                                <button className="bg-[#009987] text-white w-full hover:bg-[#24003e] cursor-pointer p-2 rounded-sm">
                                    MORE INFO
                                </button>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

