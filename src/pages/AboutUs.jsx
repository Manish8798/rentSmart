import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleBrowseProducts = () => {
    navigate("/#products-section");
    // Scroll to products section after navigation
    setTimeout(() => {
      const element = document.getElementById("products-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1>About RentSmart</h1>
            <p className="hero-subtitle">
              Revolutionizing the way you access premium technology and
              adventure gear
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <div className="container">
          <div className="content-grid">
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                RentSmart was born from a simple observation: premium technology
                and adventure equipment shouldn't be locked behind high purchase
                prices. We believe everyone deserves access to the latest gaming
                consoles, Apple products, and outdoor gear without the
                commitment and cost of ownership.
              </p>
              <p>
                Founded in 2025, our mission is to make premium products
                accessible to everyone through flexible rental solutions.
                Whether you're a gamer wanting to try the latest PS5 titles, a
                professional needing an iPad for a project, or an adventure
                enthusiast planning a trekking expedition, we've got you
                covered.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat-item">
                <div className="stat-number">10+</div>
                <div className="stat-label">Happy Customers</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Premium Products</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="our-values">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4l3 3V8l-3 3z" />
                  <path d="M22 9 12 2 2 9" />
                </svg>
              </div>
              <h3>Quality First</h3>
              <p>
                We meticulously maintain and sanitize all our products to ensure
                you receive them in pristine condition.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <h3>Flexibility</h3>
              <p>
                Rent for as long as you need - from weekly trials to monthly
                subscriptions, we adapt to your schedule.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3>Customer Centric</h3>
              <p>
                Your satisfaction is our priority. Our white-glove service
                includes free delivery, setup, and support.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3>Innovation</h3>
              <p>
                We continuously expand our catalog with the latest products and
                improve our service experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience RentSmart?</h2>
            <p>
              Join our satisfied customers who choose smart renting over
              expensive buying.
            </p>
            <div className="cta-buttons">
              <button
                onClick={handleBrowseProducts}
                className="cta-button primary"
              >
                Browse Products
              </button>
              <a
                href="mailto:rentsmart007@gmail.com"
                className="cta-button secondary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AboutUs;
