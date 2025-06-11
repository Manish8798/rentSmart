import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedPosts, setExpandedPosts] = useState(new Set());
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

  const togglePostExpansion = (postId) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const blogPosts = [
    {
      id: 1,
      title: "Why Renting Gaming Consoles Makes Financial Sense in 2025",
      excerpt:
        "With PS5 and Xbox Series X still priced above ₹50,000, renting offers a smarter way to enjoy next-gen gaming without the hefty upfront cost.",
      fullContent:
        "Gaming consoles have become increasingly expensive, with the PlayStation 5 retailing for ₹54,990 and Xbox Series X for ₹52,990 in India. For casual gamers who play 2-3 hours per week, purchasing these consoles means paying a premium for features they might not fully utilize.\n\nRenting offers a compelling alternative. At RentSmart, you can rent a PS5 for just ₹2,000 per week or ₹6,000 per month. This means you could rent it for 9 months before reaching the purchase price. For most gamers, this flexibility is invaluable.\n\nConsider these scenarios: You want to play the latest exclusive like Spider-Man 2 or Halo Infinite, but you're not sure if you'll enjoy it long-term. Renting lets you experience the full game without committing to a ₹50,000+ purchase. You can also switch between consoles based on exclusive releases.\n\nThe financial benefits extend beyond the initial cost. Renting eliminates concerns about warranty issues, repairs, or depreciation. When you're done gaming, simply return the console. No storage worries, no selling hassles, and no regrets about an expensive purchase gathering dust.",
      category: "gaming",
      author: "RentSmart Editorial Team",
      date: "January 15, 2025",
      readTime: "5 min read",
      icon: "🎮",
      featured: true,
    },
    {
      id: 2,
      title:
        "MacBook vs iPad Pro for Creative Professionals: A Rental Comparison",
      excerpt:
        "Choosing between MacBook and iPad Pro for your creative project? We break down the pros, cons, and rental costs to help you decide.",
      fullContent:
        "Creative professionals often face the dilemma: MacBook or iPad Pro? Both are powerful tools, but they serve different purposes and come with significant price tags.\n\nThe iPad Pro (12.9-inch, M2) costs ₹1,12,900, while the MacBook Air M2 starts at ₹1,19,900. For freelancers or project-based professionals, these prices can be prohibitive.\n\nRenting scenarios:\n• Short-term projects (1-2 weeks): iPad Pro for ₹3,500/week\n• Medium-term projects (1-3 months): MacBook Air for ₹8,000/month\n• Testing before buying: Both for ₹500/day\n\nThe iPad Pro excels in:\n- Portability and battery life\n- Touch-first design workflows\n- Apple Pencil integration for design\n- Instant-on convenience\n\nThe MacBook wins for:\n- Full desktop applications\n- Multiple monitor support\n- Extensive file management\n- Professional video editing\n\nFor most creative projects lasting under 3 months, renting provides access to both devices at a fraction of the purchase cost. You can even rent both simultaneously to determine which better suits your workflow before making a purchase decision.",
      category: "tech",
      author: "RentSmart Editorial Team",
      date: "January 12, 2025",
      readTime: "7 min read",
      icon: "💻",
    },
    {
      id: 3,
      title: "Ultimate Trekking Gear Checklist: What to Rent vs What to Buy",
      excerpt:
        "Planning your first Himalayan trek? Our comprehensive guide covers essential gear and smart rental strategies to keep costs under ₹15,000.",
      fullContent:
        "Trekking in the Himalayas requires specialized gear that can cost over ₹1,00,000 if purchased new. For occasional trekkers, renting is the smart financial choice.\n\nEssential Gear Categories:\n\n**Always Rent (High cost, occasional use):**\n• High-altitude sleeping bags (-20°C rated): ₹800/day\n• Mountaineering boots: ₹600/day\n• Technical jackets (Gore-Tex): ₹700/day\n• Backpacks (60L+): ₹400/day\n• Trekking poles: ₹200/day\n\n**Consider Buying (Regular use, moderate cost):**\n• Base layers and thermal wear\n• Trekking socks and inner gloves\n• Headlamp and batteries\n• Water bottles and purification tablets\n\n**Popular Trek Packages:**\n• Kedarnath (5 days): Complete gear rental ₹12,000\n• Roopkund (8 days): Complete gear rental ₹18,000\n• Everest Base Camp (16 days): Complete gear rental ₹35,000\n\nRenting advantages:\n1. Try different brands before buying\n2. No maintenance or storage issues\n3. Always get latest gear technology\n4. Insurance coverage included\n\nPro tip: Book gear 2 weeks in advance for popular trekking seasons (March-May, September-November) to ensure availability.",
      category: "adventure",
      author: "RentSmart Editorial Team",
      date: "January 10, 2025",
      readTime: "8 min read",
      icon: "🏔️",
    },
    {
      id: 4,
      title: "Apple Vision Pro Experience: Is It Worth ₹3.5 Lakhs?",
      excerpt:
        "We spent 30 days with Apple's Vision Pro to answer the big question: should you buy, rent, or skip this revolutionary device?",
      fullContent:
        "Apple Vision Pro has arrived in India with a staggering ₹3,49,900 price tag. After spending 30 days with the device through our extended rental program, here's our honest assessment.\n\n**The Good:**\n• Incredible display quality - truly feels like magic\n• Seamless integration with Apple ecosystem\n• Revolutionary spatial computing experience\n• Eye and hand tracking works flawlessly\n• Perfect for immersive movie watching\n\n**The Reality Check:**\n• Heavy device (600g) causes neck strain after 30 minutes\n• Limited app ecosystem compared to iPhone/iPad\n• Battery life of 2-3 hours is restrictive\n• Social isolation factor\n• Requires significant space for optimal use\n\n**Rental Economics:**\n• Daily rental: ₹2,500/day\n• Weekly rental: ₹15,000/week\n• Monthly rental: ₹45,000/month\n\nWho should rent:\n• Developers exploring spatial computing\n• Content creators testing VR workflows\n• Early adopters wanting to experience the future\n• Business presentations requiring wow factor\n\n**Verdict:** At ₹3.5 lakhs, Vision Pro is a luxury few can justify purchasing. However, renting for specific projects or experiences makes perfect sense. We recommend a week-long rental to fully understand the device's capabilities and limitations.\n\nThe technology is impressive, but we're still 2-3 generations away from mainstream adoption. Renting lets you experience the future without the massive financial commitment.",
      category: "tech",
      author: "RentSmart Editorial Team",
      date: "January 8, 2025",
      readTime: "6 min read",
      icon: "🥽",
    },
    {
      id: 5,
      title:
        "Wedding Photography Gear: Rent Premium Equipment for Perfect Shots",
      excerpt:
        "Professional wedding photography requires ₹5+ lakh equipment. Here's how renting can give you access to the best gear at 1/10th the cost.",
      fullContent:
        "Wedding photography is a one-time opportunity to capture perfect moments. However, professional-grade equipment can cost over ₹5 lakhs, making it unaffordable for occasional photographers.\n\n**Essential Wedding Photography Kit:**\n• Canon R5 or Sony A7R V: ₹1,200/day\n• 24-70mm f/2.8 lens: ₹800/day\n• 70-200mm f/2.8 lens: ₹900/day\n• 50mm f/1.2 lens: ₹600/day\n• Flash and lighting setup: ₹1,000/day\n• Backup camera body: ₹800/day\n• Memory cards and batteries: ₹300/day\n\n**Total daily rental: ₹5,600 vs ₹5,00,000+ purchase**\n\n**Rental Advantages for Weddings:**\n1. **Latest technology**: Always shoot with newest camera bodies\n2. **Backup security**: Multiple cameras included in packages\n3. **Insurance coverage**: Worry-free shooting experience\n4. **No maintenance**: Focus on photography, not gear upkeep\n5. **Variety**: Different lenses for different ceremony moments\n\n**Popular Wedding Packages:**\n• Single day wedding: ₹8,000 (complete kit)\n• 3-day wedding: ₹20,000 (premium package)\n• Destination wedding (7 days): ₹35,000\n\n**Pro Tips:**\n• Book equipment 1 month before wedding season\n• Test gear 1 day before the wedding\n• Include backup batteries and memory cards\n• Consider drone rental for aerial shots (₹1,500/day)\n\nMany successful wedding photographers start their careers by renting equipment, gradually purchasing pieces as their business grows.",
      category: "lifestyle",
      author: "RentSmart Editorial Team",
      date: "January 5, 2025",
      readTime: "6 min read",
      icon: "📸",
    },
    {
      id: 6,
      title: "Student Life Hacks: Renting vs Buying Tech for College",
      excerpt:
        "College students spend ₹2+ lakhs on gadgets. Smart renting strategies can reduce this cost by 70% while accessing better technology.",
      fullContent:
        "College life demands expensive technology - laptops, tablets, cameras, and more. The average student spends ₹2-3 lakhs on tech over 4 years. Here's how smart renting can slash these costs.\n\n**Traditional Student Purchases:**\n• Laptop: ₹60,000-₹1,20,000\n• iPad for notes: ₹35,000-₹80,000\n• Camera for projects: ₹25,000-₹50,000\n• Gaming console: ₹50,000+\n• Printer: ₹15,000-₹30,000\n\n**Smart Rental Alternatives:**\n\n**Semester-based Rentals:**\n• MacBook Air M2: ₹8,000/month × 4 months = ₹32,000/semester\n• iPad Pro: ₹4,000/month × 4 months = ₹16,000/semester\n• Total: ₹48,000/semester vs ₹95,000+ purchase\n\n**Project-based Rentals:**\n• DSLR for photography assignments: ₹800/week\n• Gaming console for semester break: ₹2,000/week\n• Printer during exam season: ₹500/week\n\n**Benefits for Students:**\n1. **Lower financial burden**: Pay monthly instead of lump sum\n2. **Latest technology**: Always use current-generation devices\n3. **No maintenance worries**: Focus on studies, not repairs\n4. **Flexibility**: Different devices for different subjects\n5. **No depreciation loss**: No resale hassles after graduation\n\n**Real Student Success Story:**\nRahul, B.Tech final year: \"I've rented laptops for each semester based on my course requirements. First year: basic laptop for coding. Second year: gaming laptop for game development course. Third year: MacBook Pro for iOS development. Fourth year: workstation for AI projects. Total spent: ₹1,20,000 over 4 years vs ₹3,00,000+ if I had purchased.\"\n\n**Student-Friendly Policies:**\n• 50% deposit (refundable)\n• Flexible rental periods\n• Semester break storage options\n• Upgrade options mid-semester\n\nStart your college journey smart - rent first, buy later when you know exactly what you need.",
      category: "lifestyle",
      author: "RentSmart Editorial Team",
      date: "January 3, 2025",
      readTime: "7 min read",
      icon: "🎓",
    },
    {
      id: 7,
      title: "Home Office Setup on a Budget: Premium Equipment for Remote Work",
      excerpt:
        "Build a ₹2 lakh home office setup for under ₹15,000 through strategic rentals. Perfect for freelancers and remote workers.",
      fullContent:
        'Remote work demands professional equipment, but setting up a premium home office can cost ₹2+ lakhs. Renting offers a smarter approach for freelancers and remote workers.\n\n**Premium Home Office Rental Package:**\n• 32-inch 4K Monitor: ₹2,000/month\n• Ergonomic chair (Herman Miller): ₹3,000/month\n• Standing desk: ₹2,500/month\n• Webcam + lighting setup: ₹1,500/month\n• Mechanical keyboard + mouse: ₹800/month\n• Speakers + headphones: ₹1,200/month\n• Air purifier: ₹1,000/month\n\n**Total monthly rental: ₹12,000 vs ₹2,00,000+ purchase**\n\n**Flexible Rental Options:**\n\n**Short-term freelancers (1-3 months):**\n• Basic package: ₹8,000/month\n• Premium package: ₹12,000/month\n\n**Long-term remote workers (6+ months):**\n• Discounted rates: ₹15,000/quarter\n• Option to purchase at reduced rates\n\n**Startup-friendly packages:**\n• 5-desk office setup: ₹40,000/month\n• Conference room equipment: ₹15,000/month\n\n**Why Renting Makes Sense:**\n1. **Test before investing**: Try expensive chairs and desks before buying\n2. **Scale up/down**: Adjust setup based on income fluctuations\n3. **Latest ergonomics**: Access to newest workplace wellness equipment\n4. **Tax benefits**: Rental expenses are fully deductible\n5. **No storage issues**: Return equipment when moving\n\n**Success Story:**\nMeera, Graphic Designer: "I started with a basic rental package while building my client base. As my income grew, I upgraded to premium equipment. After 18 months, I purchased the items I loved most at discounted rates. This approach saved me ₹80,000 and taught me what equipment I actually needed."\n\n**Pro Tips:**\n• Start with 3-month rentals to test workflow\n• Prioritize ergonomics - chair and desk first\n• Add equipment gradually based on client feedback\n• Document everything for tax deductions\n\nBuild your dream office gradually without breaking the bank.',
      category: "tech",
      author: "RentSmart Editorial Team",
      date: "January 1, 2025",
      readTime: "8 min read",
      icon: "🏠",
    },
    {
      id: 8,
      title: "Seasonal Sports Equipment: Smart Rentals for Every Adventure",
      excerpt:
        "From skiing in Manali to surfing in Goa, discover how renting seasonal sports equipment can unlock new adventures without storage headaches.",
      fullContent:
        "India's diverse geography offers year-round adventure sports opportunities. However, purchasing equipment for each activity can cost ₹5+ lakhs and create massive storage problems. Renting opens up a world of seasonal adventures.\n\n**Winter Sports (Dec-Feb):**\n\n**Skiing in Manali/Gulmarg:**\n• Skis, boots, poles: ₹1,500/day\n• Snowboard complete set: ₹1,200/day\n• Winter jackets and pants: ₹800/day\n• Helmets and goggles: ₹400/day\n• Complete beginner package: ₹2,500/day\n\n**Summer Water Sports (Mar-Jun):**\n\n**Surfing in Goa/Pondicherry:**\n• Surfboard rental: ₹800/day\n• Wetsuit: ₹500/day\n• SUP boards: ₹600/day\n• Kayaking equipment: ₹700/day\n\n**Monsoon Trekking (Jul-Sep):**\n\n**Western Ghats Adventures:**\n• Waterproof trekking gear: ₹1,000/day\n• Rain jackets and pants: ₹600/day\n• Waterproof backpacks: ₹400/day\n• Monsoon boots: ₹300/day\n\n**Post-Monsoon Climbing (Oct-Nov):**\n\n**Rock Climbing in Hampi/Badami:**\n• Climbing shoes: ₹400/day\n• Harnesses and helmets: ₹300/day\n• Ropes and protection: ₹800/day\n• Complete climbing kit: ₹1,200/day\n\n**Rental vs Purchase Analysis:**\n\n**Skiing Equipment:**\n• Purchase cost: ₹80,000-₹1,50,000\n• Annual usage: 5-10 days\n• Rental cost: ₹12,500-₹25,000/year\n• Savings: ₹67,500+ annually\n\n**Benefits of Seasonal Rentals:**\n1. **Try new sports**: Low barrier to entry for adventures\n2. **Latest equipment**: Always use current-season gear\n3. **No maintenance**: No cleaning, storage, or repairs\n4. **Travel light**: Rent at destination, no luggage issues\n5. **Expert guidance**: Rental shops provide setup and tips\n\n**Seasonal Adventure Calendar:**\n• Jan-Feb: Skiing, ice climbing\n• Mar-Apr: Desert camping, rock climbing\n• May-Jun: Water sports, mountain biking\n• Jul-Aug: Monsoon trekking, river rafting\n• Sep-Oct: High-altitude trekking\n• Nov-Dec: Wildlife photography, camping\n\n**Planning Tips:**\n• Book equipment 2 weeks in advance during peak seasons\n• Check weather conditions before confirming rentals\n• Include insurance for high-value equipment\n• Ask about multi-day discounts\n\nEmbrace India's adventure opportunities year-round without the commitment of purchasing specialized equipment.",
      category: "adventure",
      author: "RentSmart Editorial Team",
      date: "December 28, 2024",
      readTime: "9 min read",
      icon: "⛷️",
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
                {expandedPosts.has(featuredPost.id) && (
                  <div className="full-content">
                    {featuredPost.fullContent
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                  </div>
                )}
                <div className="post-author">
                  <span>By {featuredPost.author}</span>
                </div>
                <button
                  className="read-more-btn"
                  onClick={() => togglePostExpansion(featuredPost.id)}
                >
                  {expandedPosts.has(featuredPost.id)
                    ? "Show Less"
                    : "Read Full Article"}
                </button>
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
                    {expandedPosts.has(post.id) && (
                      <div className="full-content">
                        {post.fullContent
                          .split("\n")
                          .map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                      </div>
                    )}
                    <div className="blog-card-footer">
                      <span className="post-author">By {post.author}</span>
                      <button
                        className="read-more-link"
                        onClick={() => togglePostExpansion(post.id)}
                      >
                        {expandedPosts.has(post.id)
                          ? "Show Less ↑"
                          : "Read More →"}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      {/* Blog Disclaimer */}
      <section className="blog-disclaimer">
        <div className="container">
          <div className="disclaimer-content">
            <p>
              <strong>Disclaimer:</strong> All content on this blog is for
              informational purposes only. Prices mentioned are approximate and
              subject to change. Product availability and rental terms may vary.
              Please contact RentSmart for current pricing and availability. The
              views expressed are those of RentSmart Editorial Team and do not
              constitute professional advice.
            </p>
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
      <Footer />
    </>
  );
};

export default Blog;
