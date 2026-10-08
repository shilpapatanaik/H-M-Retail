import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import hmLogo from "../assets/hm-logo.png";

function Header() {
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="site-header">

      <div className="header-top">

        {/* Left Navigation */}
        <nav className="main-navigation">

          <Link to="/products?section=women">
            Women
          </Link>

          <Link to="/products?section=men">
            Men
          </Link>

          <Link to="/products?section=kids">
            Kids
          </Link>

        </nav>

        {/* Real H&M Logo */}
        <Link to="/" className="hm-logo">
          <img src={hmLogo} alt="H&M" />
        </Link>

        {/* Right Actions */}
        <div className="header-actions">

          <Link to="/login" className="header-account">
            Account
          </Link>

          <Link to="/cart" className="header-cart">
            Shopping Bag

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>

    </header>
  );
}

export default Header;