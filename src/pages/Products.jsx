import { useState } from "react";
import { Link } from "react-router-dom";

function Products() {
  const products = [
    {
      id: 101,
      name: "Cotton T-Shirt",
      category: "Men",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 102,
      name: "Summer Dress",
      category: "Women",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 103,
      name: "Gold Necklace",
      category: "Accessories",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 104,
      name: "Oversized Hoodie",
      category: "Men",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 105,
      name: "Floral Midi Dress",
      category: "Women",
      price: 1799,
      image:
        "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 106,
      name: "Slim Fit Jeans",
      category: "Men",
      price: 2299,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 107,
      name: "Knit Cardigan",
      category: "Women",
      price: 1899,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 108,
      name: "Leather Handbag",
      category: "Accessories",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 109,
      name: "Basic Shirt",
      category: "Men",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 110,
      name: "Pleated Skirt",
      category: "Women",
      price: 1599,
      image:
        "https://images.unsplash.com/photo-1583496661160-fb5886a13d27?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 111,
      name: "Classic Sunglasses",
      category: "Accessories",
      price: 999,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 112,
      name: "Casual Jacket",
      category: "Men",
      price: 2499,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-page">

      {/* Page Header */}
      <section className="products-header">
        <h1>Shop Our Collection</h1>

        <p>
          Discover the latest styles for every occasion.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="product-controls">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="category-buttons">

          <button
            onClick={() => setCategory("All")}
            className={category === "All" ? "active" : ""}
          >
            All
          </button>

          <button
            onClick={() => setCategory("Women")}
            className={category === "Women" ? "active" : ""}
          >
            Women
          </button>

          <button
            onClick={() => setCategory("Men")}
            className={category === "Men" ? "active" : ""}
          >
            Men
          </button>

          <button
            onClick={() => setCategory("Accessories")}
            className={category === "Accessories" ? "active" : ""}
          >
            Accessories
          </button>

        </div>
      </section>

      {/* Product Count */}
      <div className="product-count">
        {filteredProducts.length} products
      </div>

      {/* Products Grid */}
      <section className="product-grid">

        {filteredProducts.map((product) => (
          <div className="catalog-card" key={product.id}>

            <Link
              to={"/products/" + product.id}
              className="product-link"
            >
              <img
                src={product.image}
                alt={product.name}
              />

              <div className="catalog-info">

                <p className="catalog-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <p className="catalog-price">
                  ₹{product.price}
                </p>

              </div>
            </Link>

            <button className="add-bag-button">
              Add to Bag
            </button>

          </div>
        ))}

      </section>

      {/* No Products */}
      {filteredProducts.length === 0 && (
        <div className="no-products">
          <h2>No products found</h2>

          <p>
            Try another search or category.
          </p>
        </div>
      )}

    </div>
  );
}

export default Products;
