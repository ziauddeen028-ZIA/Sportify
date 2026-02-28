import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(d => setProducts(d.data));
  }, []);

  const navigate = useNavigate();

  const detail = (id) => {
    console.log("Clicked ID:", id);
    navigate(`/singleproduct/${id}`);
  };

  return (
    <div className="bg-[#eef6f6] min-h-screen py-10">
      {/* PAGE CONTAINER (same as cricket) */}
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">PRODUCTS</h1>

        {/* GRID */}
        <div className="grid grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl p-4 text-center
                         hover:-translate-y-2 transition duration-300"
              onClick={() => detail(product.documentId)}
            >
              <img
                src={
                  product.image
                    ? `${import.meta.env.VITE_STRAPI_URL}${product.image.url}`
                    : "/no-image.png"
                }
                alt={product.title}
                className="h-50 w-70   text-[#24003e]  shadow-2xl  shadow-gray-200
                            rounded-t-xl  text-center cursor-pointer  "
              />

              <h4 className="font-semibold text-lg mt-2">{product.title}</h4>
              <p className="text-md mb-3">₹{product.price}</p>

              <button className="bg-[#009987] text-white w-full py-2 rounded-md hover:bg-[#24003e] cursor-pointer">
                MORE INFO
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
