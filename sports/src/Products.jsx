import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(d => setProducts(d.data));

  }, []);

  const detail = (id) => {
    navigate(`/singleproduct/${id}`);
  };

  return (

    <div className="bg-[#eef6f6] min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <h1 className="text-3xl md:text-4xl font-bold mb-10">
          PRODUCTS
        </h1>

        {/* PRODUCT GRID */}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:-translate-y-1 transition"
              onClick={() => detail(product.documentId)}
            >

              <img
                src={
                  product.image
                    ? `${import.meta.env.VITE_STRAPI_URL}${product.image.url}`
                    : "/no-image.png"
                }
                alt={product.title}
                className="w-full h-40 object-contain mb-3"
              />

              <h4 className="font-semibold text-lg">
                {product.title}
              </h4>

              <p className="text-md mb-3">
                ₹{product.price}
              </p>

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