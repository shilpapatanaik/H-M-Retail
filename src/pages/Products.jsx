import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const section = searchParams.get("section");
  const category = searchParams.get("category");

  const productImages = {
    
  101:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",

  102:
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",

  103:
    "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",

  104:
    "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=80",

  105:
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",

  106:
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",

  107:
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",

  108:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",

  109:
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",

  110:
    "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",

  111:
    "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",

  112:
    "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",

  113:
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",

  114:
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",

  115: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",

  116:
  "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",

  117:
  "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80",
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    let apiUrl = "http://localhost:8080/products";

    if (section && category) {
      apiUrl =
        "http://localhost:8080/products?section=" +
        encodeURIComponent(section) +
        "&category=" +
        encodeURIComponent(category);
    } else if (section) {
      apiUrl =
        "http://localhost:8080/products?section=" +
        encodeURIComponent(section);
    }

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product API error:", error);
        setError("Unable to load products.");
        setLoading(false);
      });
  }, [section, category]);

  const getPageTitle = () => {
    if (section && category) {
      return (
        section.charAt(0).toUpperCase() +
        section.slice(1).toLowerCase() +
        " - " +
        category.charAt(0).toUpperCase() +
        category.slice(1).toLowerCase()
      );
    }

    if (section) {
      return (
        section.charAt(0).toUpperCase() +
        section.slice(1).toLowerCase()
      );
    }

    return "New Arrivals";
  };

  if (loading) {
    return (
      <div className="products-page">
        <h1>Loading Products...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className="products-page">

      <div className="products-header">

        <div>

          <p className="products-subtitle">
            H&M RETAIL
          </p>

          <h1>{getPageTitle()}</h1>

          <p className="products-description">
            Discover our latest collection.
          </p>

        </div>

        <p className="product-count">
          {products.length} Products
        </p>

      </div>

      {products.length === 0 ? (

        <div className="products-empty">
          <h2>No products found</h2>

          <p>
            We couldn't find products for this category.
          </p>

          <Link to="/products" className="catalog-button">
            View All Products
          </Link>
        </div>

      ) : (

        <div className="catalog-grid">

          {products.map((product) => {

            const productImage =
              productImages[product.id] ||
              "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80";

            return (

              <div
                className="catalog-card"
                key={product.id}
              >

                <Link
                  to={"/products/" + product.id}
                  className="product-card-link"
                >

                  <div className="catalog-image-container">

                    <img
                      src={productImage}
                      alt={product.name}
                      className="catalog-image"
                    />

                  </div>

                  <div className="catalog-info">

                    <p className="catalog-category">
                      {product.category}
                    </p>

                    <h2>
                      {product.name}
                    </h2>

                    <p className="catalog-brand">
                      {product.brand}
                    </p>

                    <p className="catalog-price">
                      ₹{product.price}
                    </p>

                  </div>

                </Link>

                <Link
                  to={"/products/" + product.id}
                  className="catalog-button"
                >
                  View Product
                </Link>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
}

export default Products;