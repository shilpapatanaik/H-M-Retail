import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const products = [
    {
      id: 101,
      name: "Cotton T-Shirt",
      category: "Men",
      price: 799,
      description:
        "Comfortable cotton t-shirt designed for everyday wear. Soft fabric with a relaxed fit.",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 102,
      name: "Summer Dress",
      category: "Women",
      price: 1499,
      description:
        "Lightweight summer dress with a comfortable fit, perfect for warm days and casual occasions.",
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 103,
      name: "Gold Necklace",
      category: "Accessories",
      price: 2499,
      description:
        "Elegant statement necklace designed to add a stylish finishing touch to your outfit.",
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 104,
      name: "Oversized Hoodie",
      category: "Men",
      price: 1999,
      description:
        "Relaxed oversized hoodie made for comfortable everyday styling.",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 105,
      name: "Floral Midi Dress",
      category: "Women",
      price: 1799,
      description:
        "Elegant floral midi dress with a comfortable silhouette for everyday occasions.",
      image:
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 106,
      name: "Slim Fit Jeans",
      category: "Men",
      price: 2299,
      description:
        "Classic slim-fit jeans designed for everyday comfort and style.",
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 107,
      name: "Knit Cardigan",
      category: "Women",
      price: 1899,
      description:
        "Soft knit cardigan that works perfectly for layered everyday outfits.",
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 108,
      name: "Leather Handbag",
      category: "Accessories",
      price: 2999,
      description:
        "Classic handbag with a versatile design for everyday use.",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 109,
      name: "Basic Shirt",
      category: "Men",
      price: 1299,
      description:
        "Clean and versatile basic shirt suitable for everyday outfits.",
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 110,
      name: "Pleated Skirt",
      category: "Women",
      price: 1599,
      description:
        "Stylish pleated skirt designed for a modern and comfortable look.",
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 111,
      name: "Classic Sunglasses",
      category: "Accessories",
      price: 999,
      description:
        "Classic sunglasses with a timeless design for everyday wear.",
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 112,
      name: "Casual Jacket",
      category: "Men",
      price: 2499,
      description:
        "Versatile casual jacket designed for comfortable everyday styling.",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product Not Found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products">Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <div className="product-details-image">
        <img
          src={product.image}
          alt={product.name}
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

            {["XS", "S", "M", "L", "XL"].map(
              (availableSize) => (
                <button
                  key={availableSize}
                  onClick={() =>
                    setSize(availableSize)
                  }
                  className={
                    size === availableSize
                      ? "selected"
                      : ""
                  }
                >
                  {availableSize}
                </button>
              )
            )}

          </div>
        </div>

        <div className="quantity-section">

          <h3>Quantity</h3>

          <div className="quantity-control">

            <button
              onClick={() =>
                setQuantity(
                  Math.max(1, quantity - 1)
                )
              }
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
            >
              +
            </button>

          </div>

        </div>

        <button
          className="details-add-button"
          onClick={() => {
            addToCart(product, quantity, size);
            navigate("/cart");
          }}
        >
          Add to Bag
        </button>

        <button className="details-buy-button">
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


