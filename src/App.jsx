import { useState, useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import ProductDetail from "./components/ProductDetail";
import WhatsAppFAB from "./components/WhatsAppFAB";
import Header from "./components/Header";
import products from "./data/products";

// Lazy load page components for better code splitting
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const FAQ = lazy(() => import("./pages/FAQ"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const DamagePolicy = lazy(() => import("./pages/DamagePolicy"));

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const navigate = useNavigate();
  const location = useLocation();

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
      "PS5 on rent in Delhi NCR! Premium PlayStation 5 rental service starting ₹999/day. Also offering Apple products and adventure gear on flexible rental terms with free delivery.",
    url: "https://rentsmart.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rentsmart.in/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      category: [
        "PS5 Rental",
        "Gaming Consoles",
        "Apple Products",
        "Adventure Equipment",
      ],
    },
  };

  useEffect(() => {
    // Update meta tags
    document.title =
      "PS5 on Rent Delhi NCR - Gaming Console Rentals Near Me | Apple, Adventure Gear | RentSmart";

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content =
      "PS5 on rent Delhi NCR with free delivery! Premium PlayStation 5 console rentals near you. Apple products, adventure gear & gaming accessories. Flexible rental plans, best rates guaranteed.";

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content =
      "PS5 on rent, PS5 rental Delhi, gaming console rental, PlayStation 5 rent, Apple products rental, adventure gear rental, electronics on rent Delhi NCR, PS5 rent near me, gaming equipment rental, premium rentals, flexible rental plans";

    // Add Open Graph tags
    const ogTags = [
      {
        property: "og:title",
        content:
          "PS5 on Rent Delhi NCR - Gaming Console Rentals Near Me | Apple, Adventure Gear | RentSmart",
      },
      {
        property: "og:description",
        content:
          "PS5 on rent Delhi NCR with free delivery! Premium PlayStation 5 console rentals near you. Apple products, adventure gear & gaming accessories available.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://rentsmart.in" },
      { property: "og:image", content: "/images/ps5.jpg" },
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

  // Generate search suggestions
  const generateSuggestions = (query) => {
    if (!query || query.length < 1) {
      // Show popular suggestions when no query - using actual product names and relevant terms
      return [
        { type: "product", text: "Sony PS5", icon: "🎮" },
        { type: "product", text: "iPad & Pencil", icon: "📱" },
        { type: "product", text: "TV", icon: "📺" },
        { type: "product", text: "Trekking Stick", icon: "🥾" },
        { type: "category", text: "Gaming", icon: "🎮" },
        { type: "category", text: "Apple", icon: "🍎" },
        { type: "category", text: "Adventure", icon: "🏔️" },
        { type: "search", text: "VR", icon: "🔍" },
      ];
    }

    const suggestions = [];
    const lowerQuery = query.toLowerCase();
    const addedTexts = new Set(); // Track added suggestions to prevent duplicates

    // Helper function to add suggestion if not duplicate
    const addSuggestion = (suggestion) => {
      const key = `${suggestion.type}:${suggestion.text.toLowerCase()}`;
      if (!addedTexts.has(key)) {
        addedTexts.add(key);
        suggestions.push(suggestion);
      }
    };

    // Product name matches
    products.forEach((product) => {
      if (product.name.toLowerCase().includes(lowerQuery)) {
        addSuggestion({
          type: "product",
          text: product.name,
          icon: getProductIcon(product.category),
          id: product.id,
        });
      }
    });

    // Category matches
    const categories = [...new Set(products.map((p) => p.category))];
    categories.forEach((category) => {
      if (category.toLowerCase().includes(lowerQuery)) {
        addSuggestion({
          type: "category",
          text: category,
          icon: getCategoryIcon(category),
        });
      }
    });

    // Feature matches - search through actual features
    const addedFeatures = new Set();
    products.forEach((product) => {
      if (product.features) {
        product.features.forEach((feature) => {
          if (
            feature.toLowerCase().includes(lowerQuery) &&
            !addedFeatures.has(feature.toLowerCase())
          ) {
            addedFeatures.add(feature.toLowerCase());
            addSuggestion({
              type: "feature",
              text: feature,
              icon: "✨",
            });
          }
        });
      }
    });

    // Description matches for broader terms
    const addedDescTerms = new Set();
    products.forEach((product) => {
      const description = product.description.toLowerCase();

      // Check for specific terms in descriptions that might be useful
      const relevantTerms = [
        "waterproof",
        "wireless",
        "bluetooth",
        "portable",
        "professional",
        "4k",
        "hd",
      ];
      relevantTerms.forEach((term) => {
        if (
          description.includes(term) &&
          term.includes(lowerQuery) &&
          !addedDescTerms.has(term)
        ) {
          addedDescTerms.add(term);
          addSuggestion({
            type: "search",
            text: term,
            icon: "🔍",
          });
        }
      });
    });

    // Add some intelligent suggestions based on query patterns
    if (lowerQuery.includes("trek")) {
      // For trekking-related searches, suggest specific trekking products
      const trekkingProducts = products.filter(
        (p) =>
          p.name.toLowerCase().includes("trek") ||
          p.category === "Adventure" ||
          p.description.toLowerCase().includes("trek") ||
          p.description.toLowerCase().includes("hiking")
      );
      trekkingProducts.forEach((product) => {
        addSuggestion({
          type: "product",
          text: product.name,
          icon: getProductIcon(product.category),
          id: product.id,
        });
      });
    }

    if (lowerQuery.includes("tv") || lowerQuery.includes("4k")) {
      // For TV searches, suggest the actual TV product and related features
      const tvProduct = products.find((p) => p.name.toLowerCase() === "tv");
      if (tvProduct) {
        addSuggestion({
          type: "product",
          text: tvProduct.name,
          icon: getProductIcon(tvProduct.category),
          id: tvProduct.id,
        });
      }
    }

    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  const getProductIcon = (category) => {
    const icons = {
      Gaming: "🎮",
      Apple: "🍎",
      Home: "🏠",
      Lifestyle: "💫",
      Adventure: "🏔️",
    };
    return icons[category] || "📦";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Gaming: "🎮",
      Apple: "🍎",
      Home: "🏠",
      Lifestyle: "💫",
      Adventure: "🏔️",
    };
    return icons[category] || "📂";
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Generate suggestions based on query
    const suggestions = generateSuggestions(query);
    setSearchSuggestions(suggestions);
    setSelectedSuggestionIndex(-1); // Reset selection when typing

    // Navigate to home page if not already there and user has typed something
    if (query.trim() && location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || searchSuggestions.length === 0) {
      // If Enter is pressed and we're not on home page, navigate to home
      if (
        e.key === "Enter" &&
        searchQuery.trim() &&
        location.pathname !== "/"
      ) {
        e.preventDefault();
        navigate("/");
        setShowSuggestions(false);
        return;
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedSuggestionIndex((prev) =>
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;

      case "Enter":
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(searchSuggestions[selectedSuggestionIndex]);
        } else {
          // Navigate to home if not already there and there's a search query
          if (searchQuery.trim() && location.pathname !== "/") {
            navigate("/");
          }
          setShowSuggestions(false);
        }
        break;

      case "Escape":
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
    if (searchSuggestions.length === 0) {
      const suggestions = generateSuggestions(searchQuery);
      setSearchSuggestions(suggestions);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);

    // Navigate to home page if not already there
    if (location.pathname !== "/") {
      navigate("/");
    }

    // If it's a product suggestion, you could navigate to that product
    if (suggestion.type === "product" && suggestion.id) {
      // Optional: navigate to product detail page
      // window.location.href = `/product/${suggestion.id}`;
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSuggestions(false);
    setSearchSuggestions([]);
    setSelectedSuggestionIndex(-1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);

    // Navigate to home page if not already there and there's a search query
    if (searchQuery.trim() && location.pathname !== "/") {
      navigate("/");
    }

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

  // Loading component for Suspense fallback with skeleton/shimmer effect
  const PageLoader = () => (
    <div className="page-loader">
      <div className="skeleton-container">
        {/* Header skeleton */}
        <div className="skeleton-header">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-subtitle"></div>
        </div>

        {/* Content skeleton */}
        <div className="skeleton-content">
          <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text">
              <div className="skeleton-line skeleton-product-title"></div>
              <div className="skeleton-line skeleton-product-price"></div>
              <div className="skeleton-line skeleton-product-desc"></div>
            </div>
          </div>

          <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text">
              <div className="skeleton-line skeleton-product-title"></div>
              <div className="skeleton-line skeleton-product-price"></div>
              <div className="skeleton-line skeleton-product-desc"></div>
            </div>
          </div>

          <div className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-text">
              <div className="skeleton-line skeleton-product-title"></div>
              <div className="skeleton-line skeleton-product-price"></div>
              <div className="skeleton-line skeleton-product-desc"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      <Header
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchFocus={handleSearchFocus}
        handleSearchBlur={handleSearchBlur}
        handleKeyDown={handleKeyDown}
        handleClearSearch={handleClearSearch}
        showSuggestions={showSuggestions}
        searchSuggestions={searchSuggestions}
        selectedSuggestionIndex={selectedSuggestionIndex}
        handleSuggestionClick={handleSuggestionClick}
        mobileMenuOpen={mobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {/* Routes */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                searchQuery={searchQuery}
                onRentNow={handleRentNow}
                onCalendarStateChange={handleCalendarStateChange}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onRentNow={handleRentNow} />}
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/damage-policy" element={<DamagePolicy />} />
        </Routes>
      </Suspense>

      <WhatsAppFAB disabled={isCalendarOpen} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
