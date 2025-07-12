import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  searchQuery,
  handleSearch,
  handleSearchSubmit,
  handleSearchFocus,
  handleSearchBlur,
  handleKeyDown,
  handleClearSearch,
  showSuggestions,
  searchSuggestions,
  selectedSuggestionIndex,
  handleSuggestionClick,
  mobileMenuOpen,
  toggleMobileMenu,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHowItWorksClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // If already on home page, just scroll to the section
      document.getElementById("how-it-works")?.scrollIntoView({
        behavior: "smooth",
      });
    } else {
      // If not on home page, navigate to home first, then scroll
      navigate("/");
      // Small delay to ensure the page loads before scrolling
      setTimeout(() => {
        document.getElementById("how-it-works")?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <>
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
          <a href="/" className="mobile-menu-link">
            Browse Products
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf278ewRmkCDcXOJjfvt4qF16hS75SYGog3evbSU7A-pYhH9g/viewform?usp=header"
            className="mobile-menu-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pre-book Product
          </a>
          <a href="/blog" className="mobile-menu-link">
            Blogs
          </a>
          <a href="/faq" className="mobile-menu-link">
            FAQs
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
            <div className="search-container">
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
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onKeyDown={handleKeyDown}
                  aria-label="Search products"
                  autoComplete="off"
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

              {/* Desktop Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="search-suggestions">
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`suggestion-item suggestion-${
                        suggestion.type
                      } ${index === selectedSuggestionIndex ? "selected" : ""}`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="suggestion-icon">{suggestion.icon}</span>
                      <span className="suggestion-text">{suggestion.text}</span>
                      <span className="suggestion-type">{suggestion.type}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="header-nav-container">
            <div className="nav-buttons">
              <a
                href="#how-it-works"
                onClick={handleHowItWorksClick}
                aria-label="Learn how RentSmart works"
              >
                How It Works
              </a>
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
        <div className="search-container-mobile">
          <form
            className="search-bar search-bar-mobile"
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="Search products on mobile"
          >
            <input
              type="text"
              placeholder="Search premium products..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              onKeyDown={handleKeyDown}
              aria-label="Search products"
              autoComplete="off"
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

          {/* Mobile Search Suggestions Dropdown */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className="search-suggestions search-suggestions-mobile">
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`suggestion-item suggestion-${suggestion.type} ${
                    index === selectedSuggestionIndex ? "selected" : ""
                  }`}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="suggestion-icon">{suggestion.icon}</span>
                  <span className="suggestion-text">{suggestion.text}</span>
                  <span className="suggestion-type">{suggestion.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
