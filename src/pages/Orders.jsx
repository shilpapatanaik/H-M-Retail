
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8082/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setError(
          "Unable to load orders. Check that your Order Service is running on port 8082."
        );
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="orders-page">
      <h1>My Orders</h1>

      {loading && <p>Loading your orders...</p>}

      {error && <p role="alert">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p>No orders found.</p>
      )}

      {!loading &&
        !error &&
        orders.map((order) => (
          <article key={order.id} className="order-card">
            <h2>Order #{order.id}</h2>
            <p>Customer: {order.customerName}</p>
            <p>Product ID: {order.productId}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ₹{order.price}</p>
            <p>Total: ₹{order.totalAmount}</p>
            <p>Status: {order.status}</p>
            <p>Order Date: {order.orderDate}</p>
          </article>
        ))}
    </main>
  );
}

export default Orders;
