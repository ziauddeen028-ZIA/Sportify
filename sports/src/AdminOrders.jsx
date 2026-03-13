import React, { useEffect, useState } from "react";

export default function AdminOrders() {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/orders?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
      }
    );

    const data = await res.json();
    setOrders(data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (orderId, newStatus) => {

    await fetch(
      `${import.meta.env.VITE_STRAPI_URL}/api/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_STRAPI_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            orderStatus: newStatus,
          },
        }),
      }
    );

    fetchOrders(); // refresh after update
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded">
          <p className="text-base">Order ID: #{order.id}</p>
          <p className="text-base">Status: {order.orderStatus}</p>

          <select
            value={order.orderStatus}
            onChange={(e) =>
              changeStatus(order.id, e.target.value)
            }
            className="border p-2 mt-2 text-base"
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="confirmed">Confirmed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
}