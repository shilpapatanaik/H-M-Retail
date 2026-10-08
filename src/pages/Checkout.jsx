import { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryCharge = subtotal >= 1999 ? 0 : 99;

  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    alert("Order placed successfully!");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <h1>Your Bag is Empty</h1>
          <p>Add products to your bag before proceeding to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <p>H&M RETAIL</p>
        <h1>Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="checkout-layout">

          <div className="checkout-form">

            <section className="checkout-section">
              <h2>Contact Information</h2>

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </section>

            <section className="checkout-section">
              <h2>Delivery Address</h2>

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
              />

              <div className="checkout-row">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>

              <input
                type="text"
                name="pincode"
                placeholder="PIN Code"
                value={formData.pincode}
                onChange={handleChange}
                required
              />
            </section>

          </div>

          <div className="checkout-summary">

            <h2>Order Summary</h2>

            {cartItems.map((item, index) => (
              <div className="checkout-item" key={index}>
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                </div>

                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </div>
            ))}

            <div className="summary-line">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="summary-line">
              <span>Delivery</span>
              <span>
                {deliveryCharge === 0
                  ? "FREE"
                  : `₹${deliveryCharge}`}
              </span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>

            <button type="submit" className="place-order-button">
              Place Order
            </button>

          </div>

        </div>
      </form>
    </div>
  );
}

export default Checkout;