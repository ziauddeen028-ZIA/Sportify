import React, { useEffect, useState } from "react";

export default function MyOrders() {

  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    const fetchOrders = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_STRAPI_URL}/api/orders?filters[user][id][$eq]=${user.id}&populate[order_items][populate][product][populate]=image`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
      setOrders(data.data);

    };

    fetchOrders();

  }, [token, user.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "paid":
        return "bg-blue-500";
      case "confirmed":
        return "bg-purple-600";
      case "shipped":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-600";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 && <p>No Orders Found</p>}

      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow-lg rounded-xl p-5 mb-6">

          <div className="flex justify-between items-center mb-3">
            <p className="font-semibold">
              Order ID: #{order.id}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(order.orderStatus)}`}
            >
              {order.orderStatus}
            </span>
          </div>

          {order.order_items?.map((item) => {

            const imageUrl = item.product?.image?.url;

            return (
              <div key={item.id} className="flex items-center gap-5 border-t pt-4 mt-4">

                {imageUrl && (
                  <img
                    src={`${import.meta.env.VITE_STRAPI_URL}${imageUrl}`}
                    alt={item.product?.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                )}

                <div>
                  <p className="font-semibold">
                    {item.product?.name}
                  </p>

                  <p>₹ {item.price}</p>

                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

              </div>
            );
          })}

          <div className="border-t mt-4 pt-3 text-right font-semibold">
            Total: ₹ {order.totalAmount}
          </div>

        </div>
      ))}
    </div>
  );
}