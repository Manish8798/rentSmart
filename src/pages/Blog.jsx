import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
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

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Tech Rentals: Why Renting is the New Buying",
      excerpt:
        "Discover how the rental economy is transforming the way we access premium technology and why it's becoming the preferred choice for smart consumers.",
      category: "tech",
      author: "RentSmart Team",
      date: "January 15, 2025",
      readTime: "5 min read",
      icon: "💻",
      featured: true,
    },
    {
      id: 2,
      title:
        "PS5 vs Xbox Series X: Which Gaming Console Should You Rent First?",
      excerpt:
        "A comprehensive comparison of the latest gaming consoles to help you decide which one to rent for your gaming adventures.",
      category: "gaming",
      author: "Gaming Expert",
      date: "January 12, 2025",
      readTime: "7 min read",
      icon: "🎮",
    },
    {
      id: 3,
      title: "Essential Trekking Gear for Beginners: A Complete Rental Guide",
      excerpt:
        "Planning your first trek? Learn about the essential gear you need and how renting can save you money while ensuring you have quality equipment.",
      category: "adventure",
      author: "Adventure Guide",
      date: "January 10, 2025",
      readTime: "6 min read",
      icon: "🏔️",
    },
    {
      id: 4,
      title:
        "iPad Pro vs MacBook: Which Apple Device is Right for Your Project?",
      excerpt:
        "Explore the pros and cons of iPad Pro and MacBook for different types of creative and professional work.",
      category: "tech",
      author: "Tech Reviewer",
      date: "January 8, 2025",
      readTime: "4 min read",
      icon: "📱",
    },
    {
      id: 5,
      title: "VR Gaming in 2025: Top Experiences You Can Rent Today",
      excerpt:
        "Dive into the world of virtual reality gaming and discover the most immersive experiences available for rent.",
      category: "gaming",
      author: "VR Specialist",
      date: "January 5, 2025",
      readTime: "8 min read",
      icon: "🥽",
    },
    {
      id: 6,
      title:
        "Sustainable Living: How Product Rentals Reduce Environmental Impact",
      excerpt:
        "Learn how choosing to rent instead of buy contributes to a more sustainable future and reduces electronic waste.",
      category: "lifestyle",
      author: "Sustainability Expert",
      date: "January 3, 2025",
      readTime: "5 min read",
      icon: "🌱",
    },
  ];

  const categories = [
    { id: "all", label: "All Posts", count: blogPosts.length },
    {
      id: "tech",
      label: "Technology",
      count: blogPosts.filter((post) => post.category === "tech").length,
    },
    {
      id: "gaming",
      label: "Gaming",
      count: blogPosts.filter((post) => post.category === "gaming").length,
    },
    {
      id: "adventure",
      label: "Adventure",
      count: blogPosts.filter((post) => post.category === "adventure").length,
    },
    {
      id: "lifestyle",
      label: "Lifestyle",
      count: blogPosts.filter((post) => post.category === "lifestyle").length,
    },
  ];

  const filteredPosts =
    selectedCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <>
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <div className="blog-hero-content">
            <h1>RentSmart Blog</h1>
            <p className="hero-subtitle">
              Insights, tips, and stories from the world of smart renting
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="featured-post">
          <div className="container">
            <div className="featured-post-content">
              <div className="featured-post-visual">
                <div className="featured-icon">{featuredPost.icon}</div>
                <div className="featured-badge">Featured</div>
              </div>
              <div className="featured-post-info">
                <div className="post-meta">
                  <span className="post-category">{featuredPost.category}</span>
                  <span className="post-date">{featuredPost.date}</span>
                  <span className="post-read-time">
                    {featuredPost.readTime}
                  </span>
                </div>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt}</p>
                <div className="post-author">
                  <span>By {featuredPost.author}</span>
                </div>
                <button className="read-more-btn">Read Full Article</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="blog-categories">
        <div className="container">
          <div className="categories-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts">
        <div className="container">
          <div className="posts-grid">
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card-visual">
                    <div className="blog-icon">{post.icon}</div>
                  </div>
                  <div className="blog-card-content">
                    <div className="post-meta">
                      <span className="post-category">{post.category}</span>
                      <span className="post-date">{post.date}</span>
                      <span className="post-read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="post-author">By {post.author}</span>
                      <button className="read-more-link">Read More →</button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Products CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Try What You've Read About?</h2>
            <p>
              Explore our premium products and experience the smart way to
              access the latest technology and adventure gear.
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
                Get Support
              </a>
            </div>
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
                    <a
                      href="mailto:rentsmart007@gmail.com"
                      aria-label="Contact RentSmart for career opportunities"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:rentsmart007@gmail.com"
                      aria-label="Contact RentSmart"
                    >
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
                    <a href="/#how-it-works">How It Works</a>
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
    </>
  );
};

export default Blog;
