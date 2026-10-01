import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        <div className="app">

          {/* Header */}
          <header className="header">

            <div className="logo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
                alt="H&M Logo"
              />
            </div>

            <nav>

              <Link to="/">
                Home
              </Link>

              <Link to="/products">
                Products
              </Link>

              <Link to="/orders">
                Orders
              </Link>

              <Link to="/cart">
                Shopping Bag
              </Link>

              <Link to="/login">
                Login
              </Link>

            </nav>

          </header>

          {/* Pages */}
          <main>

            <Routes>

              <Route
                path="/"
                element={<Home />}
              />

              <Route
                path="/products"
                element={<Products />}
              />

              <Route
                path="/products/:id"
                element={<ProductDetails />}
              />

              <Route
                path="/login"
                element={<Login />}
              />

              <Route
                path="/cart"
                element={<Cart />}
              />

              <Route
                path="/checkout"
                element={<Checkout />}
              />

              <Route
                path="/orders"
                element={<Orders />}
              />

            </Routes>

          </main>

          {/* Footer */}
          <footer>
            <p>© 2026 H&M Retail Project</p>
          </footer>

        </div>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;