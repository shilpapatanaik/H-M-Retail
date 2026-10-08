import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const productImages = {
    101:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    102:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    103:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    104:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=80",
  };

  useEffect(() => {
    fetch(`http://localhost:8080/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setSize(data.size === "One Size" ? "One Size" : data.size || "M");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product details error:", error);
        setError("Unable to load product details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-page">
        <h1>Loading Product...</h1>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>{error || "The product does not exist."}</p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const productImage =
    productImages[product.id] ||
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80";

  const availableSizes =
    product.size === "One Size"
      ? ["One Size"]
      : ["XS", "S", "M", "L", "XL"];

  const handleAddToBag = () => {
    addToCart(product, quantity, size);
    navigate("/cart");
  };

  return (
    <div className="product-details-page">

      <div className="product-details-image">
        <img
          src={productImage}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="product-details-info">

        <p className="details-category">
          {product.category}
        </p>

        <h1>{product.name}</h1>

        <p className="details-price">
          ₹{product.price}
        </p>

        <div className="details-divider"></div>

        <p className="details-description">
          {product.description}
        </p>

        <div className="size-section">
          <h3>Select Size</h3>

          <div className="size-buttons">
            {availableSizes.map((availableSize) => (
              <button
                type="button"
                key={availableSize}
                onClick={() => setSize(availableSize)}
                className={
                  size === availableSize ? "selected" : ""
                }
              >
                {availableSize}
              </button>
            ))}
          </div>
        </div>

        <div className="quantity-section">
          <h3>Quantity</h3>

          <div className="quantity-control">

            <button
              type="button"
              onClick={() =>
                setQuantity(Math.max(1, quantity - 1))
              }
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>
        </div>

        <button
          type="button"
          className="details-add-button"
          onClick={handleAddToBag}
        >
          Add to Bag
        </button>

        <button
          type="button"
          className="details-buy-button"
        >
          Buy Now
        </button>

        <Link
          to="/products"
          className="back-products"
        >
          Back to Products
        </Link>

      </div>
    </div>
  );
}

export default ProductDetails;