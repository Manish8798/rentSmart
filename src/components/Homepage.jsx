import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import Footer from "./Footer";
import products from "../data/products";

const Homepage = ({ searchQuery = "", onRentNow, onCalendarStateChange }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Product names for animation
  const productNames = [
    "Sony PS5",
    "iPad & Pencil",
    "Apple Watch",
    "PlayStation VR2",
    "Gaming Wheel",
    "Home Theater",
    "Trekking Stick",
    "Air Purifier",
  ];

  // Filter products based on search query from parent
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const query = searchQuery.toLowerCase().trim();

      const filtered = products.filter((product) => {
        // Direct name match
        if (product.name.toLowerCase().includes(query)) return true;

        // Description match
        if (product.description.toLowerCase().includes(query)) return true;

        // Category match
        if (product.category.toLowerCase().includes(query)) return true;

        // Features match
        if (
          product.features &&
          product.features.some((feature) =>
            feature.toLowerCase().includes(query)
          )
        )
          return true;

        // Handle common search patterns and synonyms
        const searchPatterns = {
          "4k": ["4k resolution", "tv"],
          trekking: ["trekking stick", "backpack", "adventure"],
          trek: ["trekking stick", "backpack", "adventure"],
          hiking: [
            "trekking stick",
            "backpack",
            "waterproof shoes",
            "adventure",
          ],
          ps5: ["ps5", "gaming"],
          "sony ps5": ["ps5", "gaming"],
          playstation: ["ps5", "gaming"],
          ipad: ["ipad & pencil", "apple"],
          tablet: ["ipad & pencil", "apple"],
          watch: ["apple watch", "watch"],
          tv: ["tv", "home theater", "4k resolution"],
          television: ["tv", "home theater"],
          vr: ["playstation vr2", "gaming"],
          "virtual reality": ["playstation vr2", "gaming"],
          "playstation vr2": ["playstation vr2", "gaming"],
          "ps vr2": ["playstation vr2", "gaming"],
          gaming: ["ps5", "gaming wheel", "playstation vr2"],
          apple: ["ipad & pencil", "watch"],
          adventure: [
            "trekking stick",
            "backpack",
            "waterproof shoes",
            "sleeping bag",
            "winter jacket",
          ],
          outdoor: [
            "trekking stick",
            "backpack",
            "waterproof shoes",
            "sleeping bag",
            "winter jacket",
          ],
        };

        // Check if query matches any pattern
        if (searchPatterns[query]) {
          return searchPatterns[query].some((pattern) => {
            return (
              product.name.toLowerCase().includes(pattern) ||
              product.description.toLowerCase().includes(pattern) ||
              product.category.toLowerCase().includes(pattern) ||
              (product.features &&
                product.features.some((feature) =>
                  feature.toLowerCase().includes(pattern)
                ))
            );
          });
        }

        return false;
      });

      setFilteredProducts(filtered);
    }
  }, [searchQuery]);

  // Typewriter animation effect
  useEffect(() => {
    const currentProduct = productNames[currentProductIndex];
    let timeoutId;

    if (isTyping) {
      if (displayText.length < currentProduct.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentProduct.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentProductIndex((prev) => (prev + 1) % productNames.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentProductIndex, productNames]);

  return (
    <>
      {/* Hero Section */}
      <section className="hero" role="banner" aria-label="Main banner">
        <div className="hero-content">
          <h1>
            <span className="animated-text">
              {displayText}
              <span className="cursor">|</span>
            </span>
            <span className="static-text"> on Demand</span>
          </h1>
          <p>
            Your trusted rental partner in Delhi NCR. Discover premium gaming,
            Apple products, adventure gear & home electronics with flexible,
            affordable plans that fit your lifestyle.
          </p>
          <button
            className="cta-button"
            aria-label="Explore our collection"
            onClick={() => {
              document
                .getElementById("products-section")
                ?.scrollIntoView({ behavior: "smooth" });
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
            <p>Premium Products On Rent</p>
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
        <ProductGrid
          products={filteredProducts}
          onCalendarStateChange={onCalendarStateChange}
        />
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
      <Footer />
    </>
  );
};

export default Homepage;
