import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page cart-empty">
        <h1>Shopping Bag</h1>

        <p>Your shopping bag is empty.</p>

        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1>Shopping Bag</h1>
        <p>{cartItems.length} item(s)</p>
      </div>

      <div className="cart-content">

        <div className="cart-items">

          {cartItems.map((item, index) => (
            <div
              className="cart-item"
              key={item.id + "-" + index}
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">

                <p className="cart-category">
                  {item.category}
                </p>

                <h2>{item.name}</h2>

                <p>Size: {item.size}</p>

                <p>Quantity: {item.quantity}</p>

                <p className="cart-item-price">
                  ₹{item.price}
                </p>

              </div>

            </div>
          ))}

        </div>

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>FREE</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₹{subtotal}</span>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Cart;
