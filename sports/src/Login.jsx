import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function Login() {

  const navigate = useNavigate();

  const schema = Yup.object({
    identifier: Yup.string()
      .required("Email or Username is required"),

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
        `${import.meta.env.VITE_STRAPI_URL}/api/auth/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (result.jwt) {

        localStorage.setItem("token", result.jwt);
        localStorage.setItem("user", JSON.stringify(result.user));

        toast.success("Login Successful 🎉");

        navigate("/");

      } else {

        toast.error(result.error.message);

      }

    } catch {

      toast.error("Login Failed");

    }
  };

  return (

    <div className=" bg-[#e8f3f1] flex justify-center px-4 pt-20">
      <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-10 w-full max-w-md">

        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#24003e] mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Identifier */}
          <input
            {...register("identifier")}
            placeholder="Email or Username"
            className="w-full p-3 border border-gray-400 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#00c9b2]"
          />

          <p className="text-red-600 text-sm mb-3">
            {errors.identifier?.message}
          </p>

          {/* Password */}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 border border-gray-400 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-[#00c9b2]"
          />

          <p className="text-red-600 text-sm mb-6">
            {errors.password?.message}
          </p>

          <button
            type="submit"
            className="w-full bg-[#00c9b2] hover:bg-[#009987] text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Login
          </button>

        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[#00c9b2] font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>

      </div>

    </div>

  );
}