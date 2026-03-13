import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Checkout() {

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (

    <div className="px-4 md:px-10 mt-8 flex justify-center">

      <div className="w-full max-w-4xl">

        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Checkout
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (cart.length === 0) {
              toast.error("Cart is empty");
              return;
            }

            navigate("/payment", {
              state: { formData, cart, total }
            });
          }}
          className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className="border p-2 rounded"
            pattern="[0-9]{10}"
            title="Enter a valid 10 digit phone number"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            className="border p-2 rounded"
            pattern="[0-9]{6}"
            title="Enter a valid 6 digit pincode"
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <div className="col-span-1 md:col-span-2 mt-4">

            <h3 className="text-xl font-bold mb-3">
              Total: ₹{total}
            </h3>

            <button
              type="submit"
              className="bg-[#00c9b2] hover:bg-[#009987] p-3 w-full md:w-1/3 text-white rounded cursor-pointer"
            >
              Proceed to Payment
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}