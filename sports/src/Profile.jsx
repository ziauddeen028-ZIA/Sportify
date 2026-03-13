import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userimg from "../src/assets/images/user.jpg";

export default function Profile() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);
    const handleLogout = () => {
        const isConfirmed = window.confirm("Do you want to Logout?");

        if (isConfirmed) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            toast.info("Logged out");
            navigate("/login");
        }
    };

  return (

    <div className="flex justify-center items-center mt-10 px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">

        {/* TITLE */}

        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#24003e]">
          MY PROFILE
        </h1>

        {/* IMAGE */}

        <div className="flex justify-center mb-6">
          <img
            src={userimg}
            alt="profile"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover"
          />
        </div>

        {/* USER DETAILS */}

        <div className="space-y-3 text-lg md:text-xl text-gray-800">

          <p>
            <span className="font-semibold">Name:</span> {user?.username}
          </p>

          <p>
            <span className="font-semibold">UID:</span> {user?.id}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>

        </div>

        {/* BUTTONS */}

        <div className="mt-6 flex flex-col gap-3">

          <button
            onClick={() => navigate("/myorders")}
            className="w-full bg-[#009987] hover:bg-[#24003e] text-white p-2 rounded-xl cursor-pointer"
          >
            My Orders
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white p-2 rounded-xl cursor-pointer"
          >
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}