import React, { useState } from "react";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Create WhatsApp message with form data
      const whatsappMessage = `Hi RentSmart Team! 👋🏻

*Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

Thank you for your time!`;

      // WhatsApp phone number
      const phoneNumber = "918448347366";

      // Encode the message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Create WhatsApp URL
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

      // Small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Open WhatsApp
      window.open(whatsappURL, "_blank", "noopener,noreferrer");

      // Show success message and clear form
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us-page">
      <SEO
        title="Contact RentSmart | Fast PS5 Delivery Delhi NCR | WhatsApp +91-8448347366"
        description="📞 Contact RentSmart for instant PS5 rental booking! ⚡ Same-day delivery in 2-4 hours across Delhi, Gurugram, Noida. 💰 Affordable rates available. WhatsApp +91-8448347366 for fast response!"
        keywords="contact RentSmart, PS5 on rent near me, PS5 rental booking, WhatsApp booking, fast delivery Delhi NCR, PS5 rental contact, gaming console rental contact, same day delivery booking, PS5 rental near me"
        ogTitle="Contact RentSmart | Fast PS5 Delivery Delhi NCR"
        ogDescription="📞 Contact RentSmart for instant PS5 rental booking! ⚡ Same-day delivery in 2-4 hours. 💰 Affordable rates available. WhatsApp +91-8448347366!"
        twitterTitle="Contact RentSmart | Fast PS5 Delivery Delhi NCR"
        twitterDescription="📞 Contact RentSmart for instant PS5 rental booking! ⚡ Same-day delivery in 2-4 hours. Affordable rates. WhatsApp +91-8448347366!"
        canonical="https://rentsmart.in/contact"
      />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Contact Us</h1>
            <p>
              Have questions about our rental services? We're here to help! Get
              in touch with our team for personalized assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="rental">Rental Questions</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className="status-message success">
                    Your message has been prepared for WhatsApp! Please complete
                    sending it through the WhatsApp window that opened.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="status-message error">
                    Sorry, there was an error sending your message. Please try
                    again or contact us directly.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Get in Touch</h2>

              <div className="contact-info">
                <div className="info-item">
                  <div className="info-icon">
                    <span>📧</span>
                  </div>
                  <div className="info-content">
                    <h3>Email</h3>
                    <p>rentsmart007@gmail.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <span>📱</span>
                  </div>
                  <div className="info-content">
                    <h3>WhatsApp</h3>
                    <p>Available 24/7 for instant support</p>
                    <a
                      href="https://wa.me/918448347366?text=Hi%20RentSmart%20Team!%20%F0%9F%91%8B%F0%9F%8F%BB%0A%0AI%27m%20interested%20in%20renting%20products%20from%20your%20collection.%20%0A%0ACould%20you%20please%20help%20me%20with%3A%0A%E2%80%A2%20Product%20availability%0A%E2%80%A2%20Rental%20pricing%0A%E2%80%A2%20Delivery%20details%0A%0AThank%20you!"
                      className="whatsapp-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <span>🕒</span>
                  </div>
                  <div className="info-content">
                    <h3>Response Time</h3>
                    <p>
                      We typically respond within 2-4 hours during business
                      hours
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">
                    <span>🕐</span>
                  </div>
                  <div className="info-content">
                    <h3>Business Hours</h3>
                    <p>
                      <strong>Open 24 Hours - Every Day</strong>
                    </p>
                    <p>We're here for you around the clock!</p>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="quick-links">
                <h3>Quick Help</h3>
                <ul>
                  <li>
                    <a href="/faq">Frequently Asked Questions</a>
                  </li>
                  <li>
                    <a href="/about">About RentSmart</a>
                  </li>
                  <li>
                    <a href="/blog">Latest Updates</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Rent?</h2>
            <p>Browse our collection of premium products available for rent</p>
            <a href="/" className="contact-cta-button">
              <span className="button-icon">🛍️</span>
              View Products
              <span className="button-arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
