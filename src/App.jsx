import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-container">
          <div className="logo">
            <a href="/">
              <div className="logo-circle">
                <span>RS</span>
              </div>
            </a>
          </div>
          <div className="search-bar">
            <input type="text" placeholder="I'm looking for eBook readers..." />
            <button className="search-button">
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
          </div>
          <div className="nav-buttons">
            <a href="#how-it-works">How it works</a>
            <button className="language-button">DE</button>
            <button className="account-button">
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
            </button>
            <button className="menu-button">
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
      </header>

      {/* Categories */}
      <div className="categories">
        <div className="container categories-container">
          <a href="#all" className="category-item">
            All categories
          </a>
          <a href="#phones" className="category-item">
            Cell Phones & Tablets
          </a>
          <a href="#computer" className="category-item">
            Computer
          </a>
          <a href="#cameras" className="category-item">
            Cameras
          </a>
          <a href="#gaming" className="category-item">
            Gaming & VR
          </a>
          <a href="#audio" className="category-item">
            Audio & Music
          </a>
          <a href="#wearables" className="category-item">
            Wearables
          </a>
          <a href="#brands" className="category-item">
            Brands
          </a>
          <a href="#products" className="category-item">
            Top products
          </a>
          <a href="#deals" className="category-item">
            Deals %
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Why buy when you can rent cheaply?</h2>
          <p>
            Test the latest technology risk-free – with device protection, clear
            pricing & full flexibility.
          </p>
          <button className="cta-button">Grover the</button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <p className="stats-text">500,000+ TENANTS</p>
        </div>
      </section>
    </div>
  );
}

export default App;
