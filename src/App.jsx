import { useState } from "react";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import products from "./data/products";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredProducts(products);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Prevent form submission
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  return (
    <div className="app">
      {/* Mobile Menu Overlay */}
      <div
        className={`overlay ${mobileMenuOpen ? "active" : ""}`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile-menu-header">
          <div className="logo-circle">
            <span>RS</span>
          </div>
          <button className="close-menu" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="mobile-menu-links">
          <a href="#how-it-works" className="mobile-menu-link">
            How It Works
          </a>
          <a href="#account" className="mobile-menu-link">
            My Account
          </a>
          <a href="#wishlist" className="mobile-menu-link">
            Wishlist
          </a>
          <a href="#cart" className="mobile-menu-link">
            Cart
          </a>
        </div>
      </div>

      {/* Header */}
      <header className="header" role="banner">
        <div className="container header-container">
          <div className="logo">
            <a href="/" aria-label="RentSmart Home">
              <div className="logo-circle">
                <span>RS</span>
              </div>
            </a>
          </div>
          {/* Desktop search bar */}
          <form
            className="search-bar search-bar-desktop"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search products"
          >
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchQuery}
              onChange={handleSearch}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-button"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <button
              type="submit"
              className="search-button"
              aria-label="Submit search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
          <div className="nav-buttons">
            <a href="#how-it-works">How It Works</a>
            <button className="language-button">EN</button>
            {/* <button className="account-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button className="wishlist-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <button className="cart-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button> */}
            <button className="menu-button" onClick={toggleMobileMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile search bar (hidden on desktop) */}
        <form
          className="search-bar search-bar-mobile"
          onSubmit={handleSearchSubmit}
        >
          <input
            type="text"
            placeholder="Search premium products..."
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-button"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          <button type="submit" className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </form>
      </header>

      {/* Hero Section */}
      <section className="hero" role="banner" aria-label="Main banner">
        <div className="hero-content">
          <h1>Premium Products on Demand</h1>
          <p>
            Experience premium technology without commitment. Rent the finest
            devices with flexible terms and impeccable service.
          </p>
          <button
            className="cta-button"
            aria-label="Explore our collection"
            onClick={() => {
              document
                .getElementById("products-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Collection
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" aria-label="Company statistics">
        <div className="container stats-container">
          <div className="stat-item">
            <div className="stat-icon" aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            </div>
            <p>Trusted by 500,000+ clients</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M6 8h.01"></path>
                <path d="M10 8h.01"></path>
                <path d="M14 8h.01"></path>
                <path d="M18 8h.01"></path>
                <path d="M8 12h.01"></path>
                <path d="M12 12h.01"></path>
                <path d="M16 12h.01"></path>
                <path d="M6 16h.01"></path>
                <path d="M18 16h.01"></path>
                <path d="M10 16h4"></path>
              </svg>
            </div>
            <p>Flexible payment options</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <p>Customizable rental periods</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path>
              </svg>
            </div>
            <p>White glove service included</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="products-section"
        className="products-section container"
        aria-label="Available products"
      >
        <h2>Available for Rent</h2>
        <ProductGrid products={filteredProducts} />
      </section>

      {/* Featured Categories */}
      <section
        className="featured-categories container"
        aria-label="Popular categories"
      >
        <h2>Popular Categories</h2>
        <div className="category-cards">
          <div className="category-card">
            <h3>Gaming</h3>
            <p>Consoles, VR, and accessories</p>
          </div>
          <div className="category-card">
            <h3>Apple</h3>
            <p>iPads, watches, and more</p>
          </div>
          <div className="category-card">
            <h3>Adventure</h3>
            <p>Trekking gear and equipment</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="how-it-works container"
        aria-label="How RentSmart works"
      >
        <h2>How RentSmart Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Browse & Select</h3>
            <p>Choose from our wide range of products</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Rent Monthly</h3>
            <p>Select your rental duration</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Free Delivery</h3>
            <p>Get it delivered to your doorstep</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Return Anytime</h3>
            <p>Flexible returns when you're done</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo-circle" aria-hidden="true">
                <span>RS</span>
              </div>
              <h3>RentSmart</h3>
            </div>
            <nav className="footer-links" aria-label="Footer navigation">
              <div className="footer-column">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="/about" aria-label="About RentSmart">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/blog" aria-label="Read our blog">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/careers" aria-label="View career opportunities">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="/contact" aria-label="Contact RentSmart">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Products</h4>
                <ul>
                  <li>
                    <a href="#">Gaming</a>
                  </li>
                  <li>
                    <a href="#">Apple</a>
                  </li>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Adventure</a>
                  </li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>Support</h4>
                <ul>
                  <li>
                    <a href="#">Help Center</a>
                  </li>
                  <li>
                    <a href="#">FAQs</a>
                  </li>
                  <li>
                    <a href="#">Shipping</a>
                  </li>
                  <li>
                    <a href="#">Returns</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 RentSmart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
