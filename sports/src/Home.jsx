import React from "react";
import footballimg from "../src/assets/images/Football_logo.jpg";
import cricketimg from "../src/assets/images/Cricket.jpg";
import carromimg from "../src/assets/images/Carromboard.jpg";
import Trending from "./Trending";
import Football from "./Football";
import Cricket from "./Cricket";
import Indoor from "./Indoor";
import { useNavigate } from "react-router-dom";
import SingleProduct from "./SingleProduct";



export default function Home() {
   const navigate=useNavigate();

   const football=()=>{
    navigate("/Football");
   };

   const cricket=()=>{
    navigate("/Cricket");
   };
   const indoor=()=>{
    navigate("/Indoor");
   };
   
   return (<div className>

        <div className="container w-full h-full">
            <div className="input flex justify-center  ml-40 pt-5">
                <input type="text" placeholder="Enter any Product" className="bg-white border  rounded-md p-2   ml-20 w-3/5" />
                <button className="h-10 w-fit p-2 rounded-md  bg-[#00c9b2] hover:bg-[#009987] text-white ml-2 cursor-pointer">Search</button><br />
            </div>

            <h1 className="text-7xl mt-3  text-center relative left-25  text-[#24003e]">GEAR UP . GAME ON</h1>

            <div className="flex justify-center items-center w-full ml-36 mt-6">
                <div className="categories grid grid-cols-3 gap-4 justify-evenly w-full">

                    <div className="card1 h-70 w-70 bg-[#ffffff] text-[#24003e] p-4 shadow-2xl 
                    hover:bg-[#24003e]  hover:text-white hover:-translate-y-2  hover:shadow-lg
                    rounded-xl text-4xl text-center cursor-pointer  shadow-gray-600
                    transform transition duration-300 ease-in-out" onClick={football}>
                        <img src={footballimg} alt="football" className="mb-4 rounded-t-xl"  />
                        Football
                    </div>


                    <div className="card2 h-70 w-70 bg-[#ffffff] text-[#24003e] p-4 shadow-gray-600
                    hover:bg-[#24003e] hover:text-white hover:-translate-y-2 
                    rounded-xl text-4xl text-center cursor-pointer shadow-lg
                    transform transition duration-300 ease-in-out" onClick={cricket} >
                        <img src={cricketimg} alt="cricket" className="mb-4 rounded-t-xl" />
                        Cricket
                    </div>


                    <div className="card3 h-70 w-70 bg-[#ffffff] text-[#24003e] p-4 shadow-lg 
                    hover:bg-[#24003e] hover:text-white hover:-translate-y-2 shadow-gray-600
                    rounded-xl text-4xl text-center cursor-pointer  
                    transform transition duration-300 ease-in-out" onClick={indoor}>
                        <img src={carromimg} alt="carrom" className="h-40 w-70 mb-4 rounded-t-xl"  />
                        IndoorGames
                    </div>


                </div>
            </div>
        </div>

        <Trending />
        
    </div>);
}