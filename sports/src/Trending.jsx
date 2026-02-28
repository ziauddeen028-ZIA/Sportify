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
        <div>
            <h1 className="text-4xl font-bold mt-14 mb-10">TRENDING PRODUCTS</h1>
            <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-4 gap-3 justify-around">
                    {  //this bracket for using js elements
                        trending.map((item) =>
                            <div key={item.id} className="h-60 w-60  bg-[#ffffff] text-[#24003e] p-4 pt-3 pl-3 pr-3 shadow-2xl  shadow-gray-200
                           hover:-translate-y-2  rounded-xl  text-center cursor-pointer 
                          transform transition duration-300 ease-in-out" >
                                <img
                                    src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                                    alt={item.title}
                                     className="h-40 w-70 mb-3"
                                />
                                <h4>{item.title}</h4>
                                <p>₹{item.price}</p>
                               

                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    );
}

