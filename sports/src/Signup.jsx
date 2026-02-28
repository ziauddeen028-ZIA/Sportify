import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Signup() {
  const navigate = useNavigate();

  const schema = Yup.object({
    username: Yup.string()
      .min(5, "Minimum 5 characters")
      .required("Username is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/auth/local/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.jwt) {
        localStorage.setItem("token", result.jwt);
        localStorage.setItem("user", JSON.stringify(result.user));
        toast.success("Account Created Successfully 🎉");
        navigate("/");
      } else {
        toast.error(result.error.message);
      }
    } catch {
      toast.error("Signup Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#e8f3f1]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-[#24003e] mb-6">
          Signup
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Username */}
          <input
            {...register("username")}
            placeholder="Enter username"
            className="w-full p-2 border rounded-lg mb-2"
          />
          <p className="text-red-700 text-sm mb-2">
            {errors.username?.message}
          </p>

          {/* Email */}
          <input
            {...register("email")}
            placeholder="Enter email"
            className="w-full p-2 border rounded-lg mb-2"
          />
          <p className="text-red-700 text-sm mb-2">
            {errors.email?.message}
          </p>

          {/* Password */}
          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
            className="w-full p-2 border rounded-lg mb-2"
          />
          <p className="text-red-700 text-sm mb-4">
            {errors.password?.message}
          </p>

          <button
            type="submit"
            className="w-full bg-[#00c9b2] cursor-pointer hover:bg-[#009987] text-white py-2 rounded-lg"
          >
            Signup
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#00c9b2] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}