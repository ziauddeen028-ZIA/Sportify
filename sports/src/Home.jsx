import React, { useState } from "react";
import footballimg from "../src/assets/images/Football_logo.jpg";
import cricketimg from "../src/assets/images/Cricket.jpg";
import carromimg from "../src/assets/images/Carromboard.jpg";
import Trending from "./Trending";
import { useNavigate } from "react-router-dom";

export default function Home() {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    const football = () => navigate("/football");
    const cricket = () => navigate("/cricket");
    const indoor = () => navigate("/indoor");

    const handleSearch = () => {
        const cleanSearch = search.trim();

        if (!cleanSearch) {
            alert("Enter Product Name...");
            return;
        }

        navigate(`/search/${encodeURIComponent(cleanSearch)}`);
    };

    return (

        <div className="px-4">

            {/* SEARCH BAR */}
            <div className="flex justify-center items-center gap-2 pt-5">

                <input
                    type="text"
                    placeholder="Enter any Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                    className="bg-white border rounded-full p-2 w-64 md:w-120"
                />

                <button
                    onClick={handleSearch}
                    className="px-5 py-2 rounded-full bg-[#00c9b2] hover:bg-[#009987] text-white"
                >
                    Search
                </button>

            </div>


            {/* HEADING */}

            <h1 className="text-3xl md:text-5xl lg:text-7xl mt-6 text-center text-[#24003e]">
                GEAR UP . GAME ON
            </h1>


            {/* CATEGORIES */}

            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-10 max-w-6xl mx-auto">

                <div
                    className="bg-white rounded-xl shadow-lg p-3 text-center cursor-pointer hover:-translate-y-1 transition"
                    onClick={football}
                >
                    <img
                        src={footballimg}
                        alt="football"
                        className="w-full h-20 md:h-50 object-cover rounded-md"
                    />
                    <p className="text-sm md:text-xl mt-2">Football</p>
                </div>


                <div
                    className="bg-white rounded-xl shadow-lg p-3 text-center cursor-pointer hover:-translate-y-1 transition"
                    onClick={cricket}
                >
                    <img
                        src={cricketimg}
                        alt="cricket"
                        className="w-full h-20 md:h-50 object-cover rounded-md"
                    />
                    <p className="text-sm md:text-xl mt-2">Cricket</p>
                </div>


                <div
                    className="bg-white rounded-xl shadow-lg p-3 text-center cursor-pointer hover:-translate-y-1 transition"
                    onClick={indoor}
                >
                    <img
                        src={carromimg}
                        alt="carrom"
                        className="w-full h-20 md:h-50 object-cover rounded-md"
                    />
                    <p className="text-sm md:text-xl mt-2">Indoor</p>
                </div>

            </div>


            {/* TRENDING */}

            <Trending />

        </div>

    );
}