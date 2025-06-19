import React from "react";

const Footer = () => {
  return (
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
                  <a
                    href="mailto:rentsmart007@gmail.com"
                    aria-label="Contact RentSmart for career opportunities"
                  >
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
                  <a href="/#products-section">Gaming</a>
                </li>
                <li>
                  <a href="/#products-section">Apple</a>
                </li>
                <li>
                  <a href="/#products-section">Home</a>
                </li>
                <li>
                  <a href="/#products-section">Adventure</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li>
                  <a
                    href="mailto:rentsmart007@gmail.com"
                    aria-label="Get help from RentSmart"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/faq">FAQs</a>
                </li>
                <li>
                  <a href="mailto:rentsmart007@gmail.com">Shipping</a>
                </li>
                <li>
                  <a href="mailto:rentsmart007@gmail.com">Returns</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 RentSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
