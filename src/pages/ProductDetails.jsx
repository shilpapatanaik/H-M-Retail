import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [sizeStocks, setSizeStocks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sizeError, setSizeError] = useState("");

    const productImages = {
    101: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    102: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    103: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    104: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=900&q=80",
    105: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=80",
    106: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    107: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    108: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    109: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    110: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=900&q=80",
    111: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=900&q=80",
    112: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=900&q=80",
    113: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=900&q=80",
    114: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80",
    115: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=900&q=80",
    116: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=900&q=80",
    117: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=900&q=80",
  };

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      setLoading(true);
      setError("");
      setProduct(null);
      setSizeStocks([]);
      setSize("");
      setQuantity(1);
      setSizeError("");

      try {
        const [productResponse, sizesResponse] = await Promise.all([
          fetch(`http://localhost:8080/products/${id}`),
          fetch(`http://localhost:8080/products/${id}/sizes`),
        ]);

        if (!productResponse.ok) {
          throw new Error("Product not found");
        }

        if (!sizesResponse.ok) {
          throw new Error("Unable to load size inventory");
        }

        const productData = await productResponse.json();
        const sizesData = await sizesResponse.json();

        if (cancelled) return;

        setProduct(productData);
        setSizeStocks(sizesData);

        // Automatically select a size only if there is
        // exactly one size and it is in stock.
        if (
          sizesData.length === 1 &&
          sizesData[0].stock > 0
        ) {
          setSize(sizesData[0].size);
        }
      } catch (err) {
        if (cancelled) return;

        console.error("Product details error:", err);
        setError(err.message || "Unable to load product details.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
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
        <h1>Product Details Unavailable</h1>
        <p>{error || "The product does not exist."}</p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  const productImage =
    productImages[product.id] ||
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=900&q=80";

  const selectedSize = sizeStocks.find(
    (item) => item.size === size
  );

  const selectedStock = selectedSize?.stock ?? 0;

  const totalAvailableStock = sizeStocks.reduce(
    (total, item) => total + item.stock,
    0
  );

  const handleAddToBag = () => {
    if (!size) {
      setSizeError("Please select a size before adding to your bag.");
      return;
    }

    if (!selectedSize || selectedStock <= 0) {
      setSizeError("Sorry, this size is sold out. Please choose another size.");
      return;
    }

    if (quantity > selectedStock) {
      setSizeError(
        `Only ${selectedStock} unit(s) are available in size ${size}.`
      );
      return;
    }

    setSizeError("");

    addToCart(
      { ...product, stock: selectedStock },
      quantity,
      size
    );

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
        <p className="details-category">{product.category}</p>

        <h1>{product.name}</h1>

        <p className="details-price">
          ₹{product.price}
        </p>

        <p className="inventory-status">
          {totalAvailableStock > 0
            ? "In stock"
            : "Sold out"}
        </p>

        <div className="details-divider" />

        <p className="details-description">
          {product.description}
        </p>

        <div className="size-section">
          <h3>Select Size: {size || "Please choose"}</h3>

          {sizeStocks.length === 0 ? (
            <p>No size inventory is configured for this product.</p>
          ) : (
            <div className="size-buttons">
              {sizeStocks.map((item) => {
                const soldOut = item.stock <= 0;

                return (
                  <button
                    type="button"
                    key={item.id}
                    disabled={soldOut}
                    aria-pressed={size === item.size}
                    aria-label={
                      soldOut
                        ? `${item.size}, sold out`
                        : `${item.size}, ${item.stock} available`
                    }
                    title={
                      soldOut
                        ? "Sold out"
                        : `${item.stock} available`
                    }
                    onClick={() => {
                      setSize(item.size);
                      setQuantity(1);
                      setSizeError("");
                    }}
                    className={[
                      size === item.size ? "selected" : "",
                      soldOut ? "sold-out" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {item.size}
                    {soldOut ? " — Sold out" : ""}
                  </button>
                );
              })}
            </div>
          )}

          {size && selectedSize && selectedStock > 0 && (
            <p>
              {selectedStock} unit(s) available in size {size}.
            </p>
          )}

          {sizeError && <p role="alert">{sizeError}</p>}
        </div>

        <div className="quantity-section">
          <h3>Quantity</h3>

          <div className="quantity-control">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              aria-label="Increase quantity"
              disabled={!selectedSize || quantity >= selectedStock}
              onClick={() =>
                setQuantity((current) =>
                  Math.min(selectedStock, current + 1)
                )
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
          disabled={totalAvailableStock === 0}
        >
          {totalAvailableStock === 0 ? "Sold Out" : "Add to Bag"}
        </button>

        <button
          type="button"
          className="details-buy-button"
          onClick={handleAddToBag}
          disabled={totalAvailableStock === 0}
        >
          Buy Now
        </button>

        <Link to="/products" className="back-products">
          Back to Products
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;