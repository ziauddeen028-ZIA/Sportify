import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function SearchResults() {

  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`${import.meta.env.VITE_STRAPI_URL}/api/products?populate=*&filters[title][$containsi]=${keyword}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));

  }, [keyword]);

  return (

    <div className="px-4 md:px-10 mt-6">

      {/* BACK BUTTON */}

      <button
        onClick={() => navigate(-1)}
        className="p-2 bg-white rounded-xl shadow cursor-pointer mb-4"
      >
        <ArrowBackIcon />
      </button>

      {/* TITLE */}

      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Search results for "{keyword}"
      </h1>

      {/* NO PRODUCTS */}

      {products.length === 0 ? (
        <p>No products Found</p>
      ) : (

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-4 text-center cursor-pointer hover:-translate-y-1 transition"
              onClick={() => navigate(`/singleproduct/${item.documentId}`)}
            >

              <img
                src={`${import.meta.env.VITE_STRAPI_URL}${item.image?.url}`}
                alt={item.title}
                className="w-full h-40 object-contain mb-3"
              />

              <h2 className="font-bold text-lg">
                {item.title}
              </h2>

              <p className="text-gray-700">
                ₹{item.price}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}