import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import ProductDetail from "./components/ProductDetail";
import WhatsAppFAB from "./components/WhatsAppFAB";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Clear cache on page load/refresh
  useEffect(() => {
    // Clear service worker cache
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.active?.postMessage("CLEAR_CACHE");
      });
    }

    // Clear browser cache for the current page
    if ("caches" in window) {
      caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          caches.delete(cacheName);
        });
      });
    }
  }, []);

  // Add structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "RentSmart",
    description:
      "Premium product rental service offering PS5, Apple products, and trekking equipment on flexible rental terms.",
    url: "https://rentsmart.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rentsmart.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      category: ["Gaming Consoles", "Apple Products", "Trekking Equipment"],
    },
  };

  useEffect(() => {
    // Update meta tags
    document.title =
      "RentSmart - Premium PS5, Apple Products & Trekking Equipment Rental Service";

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      "Rent premium PS5 consoles, Apple products (iPads, watches), and trekking equipment with flexible terms. No commitment, white glove service included.";

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "PS5 rental, Apple products rental, trekking equipment rental, gaming console rental, iPad rental, Apple Watch rental, adventure gear rental";

    // Add Open Graph tags
    const ogTags = [
      {
        property: "og:title",
        content: "RentSmart - Premium Product Rental Service",
      },
      {
        property: "og:description",
        content:
          "Rent premium PS5 consoles, Apple products, and trekking equipment with flexible terms.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rentsmart.in" },
    ];

    ogTags.forEach((tag) => {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    });

    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = "https://rentsmart.in";

    // Add structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
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

  // Handle calendar state change from ProductGrid
  const handleCalendarStateChange = (isOpen) => {
    setIsCalendarOpen(isOpen);
  };

  // Handle rent now functionality
  const handleRentNow = (product) => {
    // This would open the rental calendar or form
    console.log("Rent now clicked for:", product);
    // You can add your existing rental logic here
  };

  return (
    <Router>
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
            <div className="header-logo-container">
              <a href="/" aria-label="RentSmart Home">
                <div className="logo-circle">
                  <span>RS</span>
                </div>
              </a>
            </div>
            <div className="header-search-container">
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
            </div>
            <div className="header-nav-container">
              <div className="nav-buttons">
                <a href="#how-it-works">How It Works</a>
                <button className="language-button">EN</button>
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

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                onRentNow={handleRentNow}
                onCalendarStateChange={handleCalendarStateChange}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onRentNow={handleRentNow} />}
          />
        </Routes>

        <WhatsAppFAB disabled={isCalendarOpen} />
      </div>
    </Router>
  );
}

export default App;
