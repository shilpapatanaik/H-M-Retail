import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const API_URL = "http://localhost:8080/products";

const productImages = {
  101: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  102: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
  103: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
  104: "https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=800&q=80",
  105: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
  106: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
  107: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
  108: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  109: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
  110: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=80",
  111: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
  112: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
  113: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=800&q=80",
  114: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
  115: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  116: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80",
  117: "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=80",
};

function normalize(value = "") {
  return String(value).replace(/[-_\\s]/g, "").toLowerCase();
}

function formatTitle(value = "") {
  return value
    .split("-")
    .map((word) =>
      word ? word.charAt(0).toUpperCase() + word.slice(1) : ""
    )
    .join(" ");
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const section = (searchParams.get("section") || "").toUpperCase();
  const category = searchParams.get("category") || "";

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Product API returned ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Unexpected product API response");
        }

        const filteredProducts = data.filter((product) => {
          const matchesSection =
            !section ||
            String(product.section || "").toUpperCase() === section;

          const matchesCategory =
            !category ||
            normalize(product.category) === normalize(category);

          return matchesSection && matchesCategory;
        });

        // Load real size-level inventory for each displayed product.
        const productsWithInventory = await Promise.all(
          filteredProducts.map(async (product) => {
            const stockResponse = await fetch(
              `${API_URL}/${product.id}/sizes`,
              { signal: controller.signal }
            );

            if (!stockResponse.ok) {
              throw new Error(
                `Unable to load inventory for product ${product.id}`
              );
            }

            const sizeStocks = await stockResponse.json();

            if (!Array.isArray(sizeStocks)) {
              throw new Error(
                `Invalid inventory response for product ${product.id}`
              );
            }

            const totalAvailableStock = sizeStocks.reduce(
              (total, item) => total + Math.max(0, Number(item.stock) || 0),
              0
            );

            return {
              ...product,
              sizeStocks,
              totalAvailableStock,
              inStock: totalAvailableStock > 0,
            };
          })
        );

        if (!controller.signal.aborted) {
          setProducts(productsWithInventory);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Unable to load products:", err);
          setError(
            "Unable to load products or inventory. Check that the Product Service is running on port 8080."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [section, category]);

  let pageTitle = "New Arrivals";

  if (section && category) {
    pageTitle = `${formatTitle(section.toLowerCase())} - ${formatTitle(category)}`;
  } else if (section) {
    pageTitle = formatTitle(section.toLowerCase());
  } else if (category) {
    pageTitle = formatTitle(category);
  }

  if (loading) {
    return (
      <main className="products-page">
        <h1>Loading Products...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <h1>Products unavailable</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="products-page">
      <nav className="section-navigation" aria-label="Shop sections">
        <Link to="/products?section=women">Women</Link>
        <Link to="/products?section=men">Men</Link>
        <Link to="/products?section=kids">Kids</Link>
        <Link to="/products">All Products</Link>
      </nav>

      <header className="products-header">
        <div>
          <p className="products-subtitle">H&M RETAIL</p>
          <h1>{pageTitle}</h1>
          <p className="products-description">
            Discover our latest collection.
          </p>
        </div>

        <p className="product-count">{products.length} Products</p>
      </header>

      {products.length === 0 ? (
        <section className="products-empty">
          <h2>No products found</h2>
          <p>
            There are no products matching this section or category.
          </p>
          <Link to="/products" className="catalog-button">
            View All Products
          </Link>
        </section>
      ) : (
        <section className="catalog-grid">
          {products.map((product) => (
            <article className="catalog-card" key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="product-card-link"
              >
                <div className="catalog-image-container">
                  {productImages[product.id] ? (
                    <img
                      src={productImages[product.id]}
                      alt={product.name}
                      className="catalog-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="catalog-image-placeholder">
                      Image unavailable
                    </div>
                  )}
                </div>

                <div className="catalog-info">
                  <p className="catalog-category">{product.category}</p>
                  <h2>{product.name}</h2>
                  <p className="catalog-brand">{product.brand}</p>

                  <p className="catalog-price">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <p className="catalog-stock">
                    {product.inStock ? "In stock" : "Sold out"}
                  </p>

                  {product.inStock && (
                    <p className="catalog-available-sizes">
                      Available sizes:{" "}
                      {product.sizeStocks
                        .filter((item) => Number(item.stock) > 0)
                        .map((item) => item.size)
                        .join(", ")}
                    </p>
                  )}
                </div>
              </Link>

              <Link
                to={`/products/${product.id}`}
                className="catalog-button"
              >
                View Product
              </Link>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Products;