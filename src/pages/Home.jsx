import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="home-hero">

        <div className="hero-content">

          <p className="hero-small-text">
            NEW SEASON
          </p>

          <h1>
            Fashion for Every Moment
          </h1>

          <p className="hero-description">
            Discover the latest styles for women, men and kids.
          </p>

          <div className="hero-buttons">

            <Link
              to="/products?section=women"
              className="shop-button"
            >
              Shop Women
            </Link>

            <Link
              to="/products?section=men"
              className="shop-button"
            >
              Shop Men
            </Link>

            <Link
              to="/products?section=kids"
              className="shop-button"
            >
              Shop Kids
            </Link>

          </div>

        </div>

      </section>


      {/* SHOP BY CATEGORY */}

      <section className="home-section">

        <div className="section-heading">

          <div>

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              Shop by Category
            </h2>

          </div>

        </div>


        <div className="category-grid">


          {/* WOMEN */}

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
              alt="Women's Fashion"
            />

            <div className="category-content">

              <p className="category-label">
                COLLECTION
              </p>

              <h3>
                Women
              </h3>

              <p>
                Discover elegant dresses, jewelry and everyday styles.
              </p>

              <div className="category-links">

                <Link to="/products?section=women&category=dresses">
                  Dresses
                </Link>

                <Link to="/products?section=women&category=jewelry">
                  Jewelry
                </Link>

              </div>

              <Link
                to="/products?section=women"
                className="category-button"
              >
                Shop Women →
              </Link>

            </div>

          </div>


          {/* MEN */}

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=1000&q=85"
              alt="Men's Fashion"
            />

            <div className="category-content">

              <p className="category-label">
                COLLECTION
              </p>

              <h3>
                Men
              </h3>

              <p>
                Explore t-shirts, shirts, jeans, sneakers and hoodies.
              </p>

              <div className="category-links">

                <Link to="/products?section=men&category=t-shirts">
                  T-Shirts
                </Link>

                <Link to="/products?section=men&category=shirts">
                  Shirts
                </Link>

                <Link to="/products?section=men&category=jeans">
                  Jeans
                </Link>

                <Link to="/products?section=men&category=sneakers">
                  Sneakers
                </Link>

                <Link to="/products?section=men&category=hoodies">
                  Hoodies
                </Link>

              </div>

              <Link
                to="/products?section=men"
                className="category-button"
              >
                Shop Men →
              </Link>

            </div>

          </div>


          {/* KIDS */}

          <div className="category-card">

            <img
              src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85"
              alt="Kids Fashion"
            />

            <div className="category-content">

              <p className="category-label">
                COLLECTION
              </p>

              <h3>
                Kids
              </h3>

              <p>
                Cute and comfortable styles for girls and boys.
              </p>

              <div className="category-links">

                <Link to="/products?section=kids&category=dresses">
                  Dresses
                </Link>

                <Link to="/products?section=kids&category=t-shirts">
                  T-Shirts
                </Link>

                <Link to="/products?section=kids&category=jeans">
                  Jeans
                </Link>

                <Link to="/products?section=kids&category=shoes">
                  Shoes
                </Link>

                <Link to="/products?section=kids&category=hoodies">
                  Hoodies
                </Link>

              </div>

              <Link
                to="/products?section=kids"
                className="category-button"
              >
                Shop Kids →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* TRENDING NOW */}

      <section className="home-section trending-section">

        <div className="section-heading">

          <div>

            <p className="section-label">
              JUST IN
            </p>

            <h2>
              Trending Now
            </h2>

          </div>

          <Link
            to="/products"
            className="view-all-link"
          >
            View All →
          </Link>

        </div>


        <div className="arrival-grid">


          {/* WOMEN */}

          <div className="arrival-card">

            <img
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=85"
              alt="Women's Summer Dress"
            />

            <div className="arrival-content">

              <p>
                WOMEN
              </p>

              <h3>
                Summer Dresses
              </h3>

              <Link to="/products?section=women&category=dresses">
                Shop Dresses →
              </Link>

            </div>

          </div>


          {/* MEN */}

          <div className="arrival-card">

            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=85"
              alt="Men's Fashion"
            />

            <div className="arrival-content">

              <p>
                MEN
              </p>

              <h3>
                New Season Styles
              </h3>

              <Link to="/products?section=men">
                Shop Men →
              </Link>

            </div>

          </div>


          {/* WOMEN JEWELRY */}

          <div className="arrival-card">

            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=85"
              alt="Women's Jewelry"
            />

            <div className="arrival-content">

              <p>
                WOMEN
              </p>

              <h3>
                Jewelry
              </h3>

              <Link to="/products?section=women&category=jewelry">
                Shop Jewelry →
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* FEATURE BANNER */}

      <section className="home-feature">

        <div className="feature-content">

          <p className="section-label">
            STYLE FOR EVERYONE
          </p>

          <h2>
            Your wardrobe.
            <br />
            Your style.
          </h2>

          <p>
            Discover everyday essentials, statement pieces
            and everything in between.
          </p>

          <Link
            to="/products"
            className="shop-button dark-button"
          >
            Explore Collection
          </Link>

        </div>

      </section>


      {/* FINAL CTA */}

      <section className="home-cta">

        <p className="section-label">
          H&M RETAIL
        </p>

        <h2>
          Find Your New Favourite Style
        </h2>

        <p>
          Explore our latest collection and refresh your wardrobe.
        </p>

        <Link
          to="/products"
          className="shop-button"
        >
          Shop Now
        </Link>

      </section>

    </div>
  );
}

export default Home;