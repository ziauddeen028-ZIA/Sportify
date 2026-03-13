import React, { useEffect, useState } from "react";

export default function Trending() {

    const [trending, setTrending] = useState([]);

    useEffect(() => {
        fetch(
            `${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*&filters[isTrending][$eq]=true`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
                },
            }
        )
            .then(res => res.json())
            .then(data => setTrending(data.data));
    }, []);

    return (

        <div className="mt-14 max-w-7xl mx-auto px-4">

            <h1 className="text-xl md:text-3xl font-bold mb-8">
                TRENDING PRODUCTS
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {
                    trending.map((item) => (

                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-lg p-3 text-center hover:-translate-y-1 transition"
                        >

                            <img
                                src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                                alt={item.title}
                                className="w-full h-28 md:h-40 object-contain rounded-md"
                            />

                            <h4 className="text-sm md:text-lg mt-2">
                                {item.title}
                            </h4>

                            <p className="text-sm md:text-lg font-bold">
                                ₹{item.price}
                            </p>

                        </div>

                    ))
                }

            </div>

        </div>

    );
}