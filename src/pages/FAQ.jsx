import React, { useState } from "react";
import Footer from "../components/Footer";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      question: "How much does PS5 rental cost?",
      answer:
        "PS5 rental at RentSmart is very affordable:\n• Daily Rental: ₹999/day\n• Weekly Special: ₹2499 (₹357/day)\n• Monthly Deal: ₹5249 (₹175/day - 41% discount!)\n\nAll PS5 rentals include free delivery and setup in Delhi NCR. A one-time delivery and pickup charge of ₹249 applies to all orders.",
    },
    {
      question: "Is PS5 available for rent in Delhi NCR?",
      answer:
        "Yes! We provide PS5 rental service across Delhi NCR including:\n• Delhi\n• Gurgaon\n• Noida\n• Faridabad\n• Ghaziabad\n\nSame-day delivery available for orders placed before 6 PM. Free setup and gaming assistance included with every PS5 rental.",
    },
    {
      question: "What comes with PS5 rental?",
      answer:
        "Your PS5 rental package includes everything you need:\n• Sony PlayStation 5 Console (Latest Model)\n• DualSense Wireless Controller\n• HDMI cable and power adapter\n• All necessary setup cables\n• Free home delivery and setup\n• Gaming tutorial and support\n• 24/7 customer assistance\n\nAdditional controllers and VR headsets are available for separate rental.",
    },
    {
      question: "Can I rent PS5 for just one day?",
      answer:
        "Absolutely! We offer flexible PS5 rental periods:\n• Single Day: ₹999 - Perfect for events or trying specific games\n• Weekend: Great for extended gaming sessions\n• Weekly: ₹2499 - Best value for week-long gaming\n• Monthly: ₹5249 (41% discount!) - Maximum savings for long-term gaming\n\nYou can also select custom duration for your specific needs. Contact us on WhatsApp to book your PS5 rental.",
    },
    {
      question: "Do you provide PS5 games with the rental?",
      answer:
        "Yes! We do provide PS5 games with the rental for additional charges:\n• Popular PS5 games available for rent\n• Additional charges apply based on the game\n• Wide selection of latest and classic titles\n• Game discs provided with console rental\n• Mix and match multiple games for your rental period\n\nWe also provide guidance on:\n• Best PS5 games to download\n• PlayStation Plus subscription benefits\n• Popular free-to-play games\n• Exclusive PlayStation games worth trying\n\nContact us on WhatsApp to know game availability and pricing for your rental period.",
    },
    {
      question: "What if PS5 gets damaged during rental?",
      answer:
        "We understand accidents happen. Here's our damage policy for PS5 rentals:\n• Minor wear and tear: No charges\n• Accidental damage: Repair cost sharing based on damage assessment\n• Complete damage/loss: Security deposit applies\n• Manufacturer defects: No charges to customer\n\nWe recommend handling the PS5 with care and keeping it in a safe, well-ventilated area. Our team provides detailed usage instructions during delivery.",
    },
    {
      question: "What rental plans do you offer?",
      answer:
        "We offer flexible rental plans to suit your needs:\n• Single Day: Perfect for one-day events or trials\n• Weekend: Great for weekend adventures or short projects\n• Week: Ideal for week-long needs or extended testing\n• Month: Best value for long-term rentals\n• Custom Duration: Select your own start and end dates for maximum flexibility\n\nEach plan comes with different pricing, and generally, longer rental periods offer better value. With our custom duration option, you can choose exactly the dates you need the product for.",
    },
    {
      question: "How does RentSmart's rental process work?",
      answer:
        "Our rental process is simple and convenient:\n1. Select Your Product: Browse and choose from our premium collection\n2. Choose Duration: Pick from our standard plans or select custom dates\n3. Click Rent Now: This will connect you with us on WhatsApp\n4. Confirm Order: We'll confirm your order details via WhatsApp\n5. Fill Form: Complete our Google form with necessary details\n6. Delivery: We'll deliver your product, with same-day delivery available\n\nNote: A delivery and pickup charge of ₹249 applies to all orders.",
    },
    {
      question: "How does the custom duration rental work?",
      answer:
        "Our custom duration rental gives you complete control over your rental period:\n1. Select 'Custom Duration' when viewing a product\n2. Choose your preferred start date\n3. Select your desired end date\n4. The system will calculate the rental cost based on your selected duration\n\nThis option is perfect for when you need equipment for a specific project or event that doesn't fit into our standard rental periods.",
    },
    {
      question: "Do you offer same-day delivery?",
      answer:
        "Yes! We offer same-day delivery service for your convenience. Just make sure to complete the order process (including the Google form submission) early enough in the day. Contact us on WhatsApp for specific delivery time estimates for your location.",
    },
    {
      question: "What are the delivery and pickup charges?",
      answer:
        "We charge a flat rate of ₹249 that covers both delivery and pickup of the product. This charge applies to all orders regardless of the rental duration or product category.",
    },
    {
      question: "What types of products can I rent?",
      answer:
        "RentSmart offers a diverse range of premium products across several categories:\n• Gaming: Latest consoles, PlayStation VR2 equipment, and gaming accessories\n• Apple Products: iPads, Apple Watches, and other Apple devices\n• Adventure Gear: High-quality trekking and outdoor equipment\n• Home Electronics: Various electronic items for home use",
    },
    {
      question: "What information do I need to provide in the Google form?",
      answer:
        "The Google form helps us process your order efficiently. You'll need to provide:\n• Basic contact information\n• Delivery address details\n• Preferred delivery time\n• ID proof for verification\n• Rental duration confirmation\n\nWe ensure all your information is kept secure and confidential.",
    },
    {
      question: "What happens if I want to extend my rental period?",
      answer:
        "Extending your rental is easy! Simply message us on WhatsApp before your current rental period ends. We'll help you extend to your desired duration based on product availability. The extension will be charged according to our standard rental plans or custom duration rates.",
    },
    {
      question: "How do returns work?",
      answer:
        "Returns are hassle-free:\n1. Message us on WhatsApp when you're ready to return\n2. We'll schedule a pickup at your convenience\n3. Our team will collect the item from your location\n\nThe initial ₹249 delivery and pickup charge covers the return pickup as well.",
    },
  ];

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-content">
            <h1>Frequently Asked Questions</h1>
            <p className="hero-subtitle">
              Find answers to common questions about RentSmart's services
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="faq-grid">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${
                  expandedIndex === index ? "expanded" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {expandedIndex === index ? "−" : "+"}
                  </span>
                </div>
                <div
                  className={`faq-answer ${
                    expandedIndex === index ? "show" : ""
                  }`}
                >
                  {faq.answer.split("\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still have questions?</h2>
            <p>
              Our team is here to help! Reach out to us through WhatsApp or give
              us a call for instant assistance with your rental needs.
            </p>
            <div className="cta-buttons">
              <a href="tel:+918448347366" className="cta-button primary">
                Call Us
              </a>
              <a
                href="https://wa.me/918448347366?text=Hi%20RentSmart%20Team!%20I%20have%20some%20questions%20regarding%20the%20rental%20process.%20Could%20you%20please%20help%20me?"
                className="cta-button secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQ;
