
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      <section className="home-hero">
        <div className="hero-content">
          <p className="hero-small-text">NEW SEASON</p>

          <h1>Fashion for Every Moment</h1>

          <p>
            Discover the latest styles for women, men and kids.
          </p>

          <Link to="/products" className="shop-button">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="home-section">
        <h2>Shop by Category</h2>

        <div className="category-grid">

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
              alt="Women's Fashion"
            />

            <div className="category-content">
              <h3>Women</h3>

              <Link to="/products">
                Shop Women
              </Link>
            </div>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=80"
              alt="Men's Fashion"
            />

            <div className="category-content">
              <h3>Men</h3>

              <Link to="/products">
                Shop Men
              </Link>
            </div>
          </div>

          <div className="category-card">
            <img
              src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80"
              alt="Fashion Accessories"
            />

            <div className="category-content">
              <h3>Accessories</h3>

              <Link to="/products">
                Shop Accessories
              </Link>
            </div>
          </div>

        </div>
      </section>

      <section className="home-section new-arrivals">

        <div className="section-heading">
          <h2>New Arrivals</h2>

          <Link to="/products">
            View All
          </Link>
        </div>

        <div className="arrival-grid">

          <div className="arrival-card">
            <img
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=80"
              alt="Summer Dress"
            />

            <h3>Summer Collection</h3>
            <p>Fresh styles for the season</p>
          </div>

          <div className="arrival-card">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80"
              alt="Fashion Collection"
            />

            <h3>Trending Styles</h3>
            <p>Discover what's new</p>
          </div>

          <div className="arrival-card">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80"
              alt="Women's Collection"
            />

            <h3>Everyday Fashion</h3>
            <p>Styles made for you</p>
          </div>

        </div>
      </section>

      <section className="home-cta">

        <h2>Find Your New Favourite Style</h2>

        <p>
          Explore our latest collection and refresh your wardrobe.
        </p>

        <Link to="/products" className="shop-button">
          Explore Collection
        </Link>

      </section>

    </div>
  );
}

export default Home;
