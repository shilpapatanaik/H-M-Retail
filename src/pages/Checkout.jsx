
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({ name: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (isSubmitting || cartItems.length === 0) return;

    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      for (const item of cartItems) {
        const response = await fetch("http://localhost:8082/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: formData.name.trim(),
            productId: item.id,
            size: item.size,
            quantity: item.quantity,
            price: item.price,
            status: "CREATED",
            orderDate: new Date().toISOString().slice(0, 10),
          }),
        });

        if (!response.ok) {
          const message = await response.text();
          throw new Error(
            message || `Order request failed with status ${response.status}.`
          );
        }
      }

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Unable to place your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="checkout-page">
        <h1>Order placed successfully!</h1>
        <p>Thank you for shopping with H&M Retail.</p>
        <Link to="/products">Continue Shopping</Link>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <h1>Checkout</h1>
        <p>Your shopping bag is empty.</p>
        <Link to="/products">Continue Shopping</Link>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <form onSubmit={handlePlaceOrder}>
        <label htmlFor="customerName">Full Name</label>
        <input
          id="customerName"
          type="text"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          required
        />

        <h2>Order Summary</h2>

        {cartItems.map((item, index) => (
          <div key={`${item.id}-${item.size}-${index}`}>
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ₹{item.price}</p>
            <p>Size: {item.size}</p>
          </div>
        ))}

        <h3>Total: ₹{totalAmount.toFixed(2)}</h3>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}

export default Checkout;
