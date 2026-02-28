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
import Football from "./Football";





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
            .then(data => {
                console.log(data);
                setProduct(data.data)

            });

    }, [id]);

    if (!product) return <h1>Loading...</h1>;

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));




    return (<div>
        <button onClick={() => {
            navigate(-1)
        }} className="p-3 bg-white ml-5 cursor-pointer rounded-xl shadow hover:shadow-black"><ArrowBackIcon /></button>

        <div className="container flex justify-center mt-10 pl-40 w-full ">

            <div className="img-container flex  ml-10 ">

                <div className="leftimg border border-gray-600 w-[400px] ">
                    <img
                        src={
                            product.image?.url
                                ? `${import.meta.env.VITE_STRAPI_URL}${product.image.url}`
                                : "/no-image.png"
                        }
                        alt={product.title}
                        className="h-full w-full"
                    />


                </div>

            </div>

            <div className="product-details w-full ml-10">

                <h1 className="text-4xl font-bold text-gray-900 whitespace-nowrap ">{product.title}</h1>
                <p className="text-gray-600 mt-4">
                    {product.description?.[0]?.children?.[0]?.text}
                </p>
                <p className="text-yellow-500 mt-4">⭐{product.rating}/10 ({product.reviewsCount} reviews)</p>
                <h1 className="text-4xl font-bold text-gray-900 mt-4">₹{product.price}</h1>

                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="p-2.5 rounded-sm w-10  bg-[#552d6e] hover:bg-[#24003e] mt-4 text-white cursor-pointer  ">-</button>
                <span className="text-2xl ml-1 mr-1 text-wh">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2.5 w-10 rounded-sm cursor-pointer bg-[#552d6e] hover:bg-[#24003e] text-white">+</button>
                <span> Available Stock : ({product.stock})</span>

                <div className="buttons w-full flex flex-col mt-5 gap-1">
                    <button onClick={() => {

                        if (!token) {
                            navigate("/login");
                        } else {
                            dispatch(addToCart({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                image: product.image,
                                quantity
                            }));
                            toast.success("Item added to cart 🛒");
                        }

                    }}
                        className="cart w-1/2 bg-[#00c9b2] hover:bg-[#009987] text-white  text-[20px] rounded-sm cursor-pointer p-3">Add To Cart <ShoppingCartOutlinedIcon />
                    </button>
                    <button onClick={() => {
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
                        className="wishlist w-1/2 bg-pink-400 hover:bg-pink-500  text-white  text-[20px] rounded-sm cursor-pointer  pl-2 p-3">Add To Wishlist <FavoriteBorderIcon />
                    </button>
                </div>

            </div>


        </div>


    </div>);
}