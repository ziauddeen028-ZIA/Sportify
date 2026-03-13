import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";
import { toast } from "react-toastify";
import { addToWishlist } from "./redux/wishlistSlice";
import { useNavigate } from "react-router-dom";

export default function SingleProduct() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_STRAPI_URL}/api/products/${id}?populate=*`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
            },
        })
            .then(res => res.json())
            .then(data => setProduct(data.data));
    }, [id]);

    if (!product) return <h1 className="text-center mt-10">Loading...</h1>;

    const token = localStorage.getItem("token");

    return (

        <div className="py-10 px-4 md:px-10">

            {/* BACK BUTTON */}

            <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white cursor-pointer rounded-xl shadow inline-flex items-center gap-2"
            >
                <ArrowBackIcon />
                Back
            </button>


            {/* PRODUCT SECTION */}

            <div className="flex flex-col md:flex-row justify-center gap-10 mt-10 max-w-6xl mx-auto">

                {/* IMAGE */}

                <div className="w-full md:w-1/2 flex justify-center">

                    <div className="border border-gray-600 rounded-lg overflow-hidden w-full max-w-md">

                        <img
                            src={
                                product.image?.url
                                    ? `${import.meta.env.VITE_STRAPI_URL}${product.image.url}`
                                    : "/no-image.png"
                            }
                            alt={product.title}
                            className="w-full h-auto object-cover"
                        />

                    </div>

                </div>


                {/* PRODUCT DETAILS */}

                <div className="w-full md:w-1/2">

                    <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                        {product.title}
                    </h1>

                    <p className="text-gray-600 mt-4">
                        {product.description?.[0]?.children?.[0]?.text}
                    </p>

                    <p className="text-yellow-500 mt-4">
                        ⭐{product.rating}/10 ({product.reviewsCount} reviews)
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#00c9b2]">
                        ₹{product.price}
                    </h2>


                    {/* QUANTITY */}

                    <div className="flex items-center gap-2 mt-6">

                        <button
                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                            className="p-2 rounded-md w-10 bg-[#552d6e] text-white"
                        >
                            −
                        </button>

                        <span className="text-2xl font-semibold min-w-12 text-center">
                            {quantity}
                        </span>

                        <button
                            onClick={() => {
                                if (quantity < product.stock) {
                                    setQuantity(quantity + 1);
                                }
                            }}
                            disabled={quantity >= product.stock}
                            className={`p-2 rounded-md w-10 text-white
                            ${quantity >= product.stock
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-[#552d6e] hover:bg-[#24003e]"}`}
                        >
                            +
                        </button>

                        <span className="text-sm text-gray-600 ml-2">
                            Stock: {product.stock}
                        </span>

                    </div>


                    {/* BUTTONS */}

                    <div className="flex flex-col gap-3 mt-8">

                        <button
                            onClick={() => {

                                if (quantity > product.stock) {
                                    toast.error("Stock limit exceeded ❌");
                                    return;
                                }

                                if (!token) {
                                    navigate("/login");
                                } else {
                                    dispatch(addToCart({
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        image: product.image,
                                        quantity,
                                        stock: product.stock
                                    }));

                                    toast.success("Item added to cart 🛒");
                                }

                            }}
                            className="bg-[#00c9b2] hover:bg-[#009987] text-white font-semibold rounded-lg p-3 flex items-center justify-center gap-2"
                        >
                            <ShoppingCartOutlinedIcon />
                            Add To Cart
                        </button>


                        <button
                            onClick={() => {

                                if (!token) {
                                    navigate("/login");
                                } else {
                                    dispatch(addToWishlist({
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        image: product.image
                                    }));

                                    toast.info("Added to wishlist ❤️");
                                }

                            }}
                            className="bg-pink-400 hover:bg-pink-500 text-white font-semibold rounded-lg p-3 flex items-center justify-center gap-2"
                        >
                            <FavoriteBorderIcon />
                            Add To Wishlist
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}