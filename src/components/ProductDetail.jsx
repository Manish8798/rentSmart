import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import RentalCalendar from "./RentalCalendar";
import Footer from "./Footer";
import SEO from "./SEO";

const ProductDetail = ({ onRentNow }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null); // Track selected plan
  const [expandedFAQ, setExpandedFAQ] = useState(null); // Track expanded FAQ
  const [selectedGameImage, setSelectedGameImage] = useState(0); // Track selected game image for PS5 gallery

  // PS5 Games Images
  const ps5GameImages = [
    {
      src: `${import.meta.env.BASE_URL || "/"}images/apex_legends.jpeg`,
      alt: "Apex Legends",
      title: "Apex Legends",
    },
    {
      src: `${import.meta.env.BASE_URL || "/"}images/fall_guys.jpeg`,
      alt: "Fall Guys",
      title: "Fall Guys",
    },
    {
      src: `${import.meta.env.BASE_URL || "/"}images/fortnite.jpeg`,
      alt: "Fortnite",
      title: "Fortnite",
    },
    {
      src: `${import.meta.env.BASE_URL || "/"}images/genshin_impact.jpeg`,
      alt: "Genshin Impact",
      title: "Genshin Impact",
    },
    {
      src: `${import.meta.env.BASE_URL || "/"}images/rocket_league.jpeg`,
      alt: "Rocket League",
      title: "Rocket League",
    },
  ];

  // Scroll to top when component mounts or id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate("/")} className="back-button">
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  const { name, description, price, priceUnit, image, category, features } =
    product;

  // Function to convert price to xx9 format (same as RentalCalendar)
  const convertToXX9Format = (price) => {
    if (price === 0) return 0;
    const lastDigit = price % 10;
    if (lastDigit === 9) return price;

    // Round to nearest number ending in 9
    const lowerOption = price - lastDigit - 1;
    const upperOption = price - lastDigit + 9;

    // Choose the closer option, preferring the lower one in case of tie
    if (Math.abs(price - lowerOption) <= Math.abs(price - upperOption)) {
      return Math.max(lowerOption, 9); // Ensure minimum price of 9
    } else {
      return upperOption;
    }
  };

  // Check if product is an adventure item
  const isAdventureItem = () => {
    return category === "Adventure";
  };

  // Function to get the base daily rate for comparison
  const getBaseDailyRate = () => {
    // For PS5 + Gaming Wheel combo, the base rate is 499/day
    if (
      name &&
      name.toLowerCase().includes("ps5") &&
      name.toLowerCase().includes("gaming wheel")
    ) {
      return 499;
    }
    // For PS5, the base rate is 299/day
    if (name && name.toLowerCase().includes("ps5")) {
      return 299;
    }
    // For other products, use the passed price as base rate
    return price;
  };

  // Function to check if we should show slashed pricing
  const shouldShowSlashedPrice = (duration, currentPerDay) => {
    const baseDailyRate = getBaseDailyRate();

    // Show slashed price if current per day rate is lower than base rate
    // and we're not dealing with adventure items (they don't have discounts)
    if (isAdventureItem()) {
      return false;
    }

    return currentPerDay < baseDailyRate;
  };

  // Tiered pricing function (same as RentalCalendar)
  const calculateTieredPrice = (duration) => {
    let baseTotal, perDay, tier;

    // Adventure items have special week/month pricing based on per day price
    if (isAdventureItem()) {
      if (duration === 1) {
        baseTotal = price;
        perDay = price;
        tier = "adventure-single-day";
      } else if (duration === 2) {
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-two-days";
      } else if (duration >= 3 && duration <= 6) {
        // Short-term adventure rental
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-short-term";
      } else if (duration === 7) {
        // Week pricing for adventure items - full daily rate
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-week";
      } else if (duration >= 8 && duration <= 29) {
        // Extended adventure rental - use daily rate
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-extended";
      } else if (duration >= 30) {
        // Monthly pricing for adventure items - full daily rate
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-month";
      } else {
        return { total: 0, perDay: 0, tier: "invalid", discount: 0 };
      }
    } else {
      // Check if this is PS5 + Gaming Wheel combo
      const isPS5Combo =
        name &&
        name.toLowerCase().includes("ps5") &&
        name.toLowerCase().includes("gaming wheel");
      const isPS5 = name && name.toLowerCase().includes("ps5") && !isPS5Combo;

      if (isPS5Combo) {
        // Special pricing for PS5 + Gaming Wheel combo
        if (duration === 1) {
          baseTotal = 1499;
          perDay = 1499;
          tier = "ps5-combo-single-day";
        } else if (duration === 2) {
          baseTotal = 2999;
          perDay = Math.round(2999 / 2);
          tier = "ps5-combo-weekend";
        } else if (duration === 7) {
          baseTotal = 3999;
          perDay = Math.round(3999 / 7);
          tier = "ps5-combo-week";
        } else if (duration === 30) {
          baseTotal = 7999;
          perDay = Math.round(7999 / 30);
          tier = "ps5-combo-month";
        } else if (duration > 20) {
          // For durations more than 20 days, use 399/day
          baseTotal = duration * 399;
          perDay = 399;
          tier = "ps5-combo-long-term";
        } else {
          // For other durations (3-20 days), use daily rate of 499
          baseTotal = duration * 499;
          perDay = 499;
          tier = "ps5-combo-custom";
        }
      } else {
        // Regular pricing for non-adventure items
        if (duration === 1) {
          baseTotal = 1000;
          perDay = 1000;
          tier = "single-day";
        } else if (duration === 2) {
          baseTotal = 2000;
          perDay = 1000;
          tier = "two-days";
        } else if (duration >= 3 && duration <= 7) {
          // Special pricing for PS5 week plan
          if (duration === 7 && isPS5) {
            baseTotal = 2499;
            perDay = Math.round(2499 / 7);
            tier = "ps5-week-special";
          } else {
            baseTotal = duration * 500;
            perDay = 500;
            tier = "short-term";
          }
        } else if (duration >= 8 && duration <= 12) {
          baseTotal = duration * price;
          perDay = price;
          tier = "medium-term";
        } else if (duration >= 13 && duration <= 29) {
          baseTotal = duration * 249;
          perDay = 249;
          tier = "extended-term";
        } else if (duration >= 30) {
          baseTotal = duration * price;
          perDay = price;
          tier = "long-term";
        } else {
          return { total: 0, perDay: 0, tier: "invalid", discount: 0 };
        }
      }
    }

    // Apply discounts
    let discount = 0;

    // Adventure items don't have discounts - use full daily rate
    if (isAdventureItem()) {
      // No discounts for adventure items
      discount = 0;
    } else {
      // Check if this is PS5 + Gaming Wheel combo
      const isPS5Combo =
        name &&
        name.toLowerCase().includes("ps5") &&
        name.toLowerCase().includes("gaming wheel");
      const isPS5 = name && name.toLowerCase().includes("ps5") && !isPS5Combo;

      if (isPS5Combo) {
        // Calculate discount for PS5 combo based on daily rate (499/day)
        const dailyRate = 499;
        const standardPrice = duration * dailyRate;

        // Only show discount if the plan is actually cheaper than standard rate
        // Don't show discount for single day (₹1,499) or weekend (₹2,999) as they're premium pricing
        if (baseTotal < standardPrice && duration >= 7) {
          discount = Math.round(
            ((standardPrice - baseTotal) / standardPrice) * 100
          );
        }
      } else {
        // Apply discounts for exactly 30 days for non-adventure items
        if (duration === 30) {
          if (isPS5) {
            // Fixed price for PS5 monthly rentals (calculated discount based on daily rate)
            const dailyRate = 299;
            const monthlyAtDailyRate = dailyRate * 30; // 8970
            baseTotal = 5249;
            discount = Math.round(
              ((monthlyAtDailyRate - baseTotal) / monthlyAtDailyRate) * 100
            ); // 41% discount
            tier = "30-day-ps5-special";
          } else {
            // Apply 25% discount for other products monthly rentals
            discount = 25;
            baseTotal = baseTotal * 0.75;
            tier = "30-day-special";
          }
        }
      }
    }

    // Convert to xx9 format
    const finalTotal = convertToXX9Format(baseTotal);

    return {
      total: finalTotal,
      perDay: Math.round(finalTotal / duration),
      tier,
      discount: discount, // Already in percentage format
    };
  };

  // Generate rental plans with actual calculated prices
  const generateRentalPlans = () => {
    const plans = [
      { key: "single", label: "Single Day", days: 1 },
      { key: "weekend", label: "Weekend", days: 2 },
      { key: "week", label: "Week", days: 7 },
      { key: "month", label: "Month", days: 30 },
    ];

    return plans.map((plan) => {
      const pricing = calculateTieredPrice(plan.days);
      return {
        ...plan,
        price: `₹${pricing.total.toLocaleString()}`,
        originalPrice: pricing.total,
        perDay: pricing.perDay,
        discount: pricing.discount,
        tier: pricing.tier,
      };
    });
  };

  const RENTAL_PLANS = generateRentalPlans();

  // Handle plan selection
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  // Handle opening rental calendar or direct WhatsApp
  const handleRentAction = () => {
    if (selectedPlan) {
      // If a plan is selected, send WhatsApp message directly
      handleDirectWhatsApp();
    } else {
      // If no plan selected, open calendar
      setCalendarOpen(true);
    }
  };

  // Handle direct WhatsApp message for selected plan
  const handleDirectWhatsApp = () => {
    if (!selectedPlan) return;

    const phoneNumber = "918448347366";

    // Get current date for start date
    const today = new Date();
    const startDate = today;
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + selectedPlan.days);

    // Format special offers and discounts
    let specialOffers = "";
    if (selectedPlan.tier === "ps5-week-special") {
      specialOffers = "\n🎮 PS5 Week Special Deal!";
    } else if (selectedPlan.tier === "30-day-ps5-special") {
      specialOffers = "\n🎮 PS5 Monthly Special Deal!";
    } else if (selectedPlan.tier === "30-day-special") {
      specialOffers = "\n🎉 Monthly Discount Applied!";
    }

    if (selectedPlan.discount > 0) {
      specialOffers += `\n💰 ${selectedPlan.discount}% Discount Included!`;
    }

    const message = `Hi RentSmart Team! 👋🏻

I'm interested in renting the ${name} with the following plan:

📋 RENTAL PLAN DETAILS:
• Plan: ${selectedPlan.label}
• Duration: ${selectedPlan.days} ${selectedPlan.days === 1 ? "day" : "days"}
• Per Day Rate: ₹${selectedPlan.perDay}
• Total Amount: ₹${selectedPlan.originalPrice.toLocaleString()}${specialOffers}

📅 PREFERRED DATES:
• Start Date: ${startDate.toLocaleDateString()}
• End Date: ${endDate.toLocaleDateString()}

Could you please confirm availability and arrange pickup/delivery?

Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  // Handle opening rental calendar
  const handleOpenCalendar = () => {
    setCalendarOpen(true);
  };

  // Handle closing rental calendar
  const handleCloseCalendar = () => {
    setCalendarOpen(false);
  };

  // Handle rental confirmation from calendar and WhatsApp integration
  const handleRentalConfirm = (startDate, endDate, duration, pricing) => {
    const phoneNumber = "918448347366";

    // Format the pricing tier information
    let pricingInfo = "";
    if (pricing.tier === "adventure-single-day") {
      pricingInfo = `Adventure daily rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-two-days") {
      pricingInfo = `Adventure rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-short-term") {
      pricingInfo = `Adventure short-term: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-week") {
      pricingInfo = `Adventure weekly rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-extended") {
      pricingInfo = `Adventure extended rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-month") {
      pricingInfo = `Adventure monthly rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "single-day") {
      pricingInfo = "Single day rate: ₹1,000";
    } else if (pricing.tier === "two-days") {
      pricingInfo = "Two day rate: ₹1,000/day";
    } else if (pricing.tier === "short-term") {
      pricingInfo = "Short-term rate: ₹500/day (3-7 days)";
    } else if (pricing.tier === "ps5-week-special") {
      pricingInfo = "PS5 Week Special: ₹2,499";
    } else if (pricing.tier === "30-day-ps5-special") {
      pricingInfo = "PS5 30-day Special (41% discount!): ₹5,249";
    } else if (pricing.tier === "30-day-special") {
      pricingInfo = "30-day Special (25% discount!)";
    } else if (pricing.tier === "extended-term") {
      pricingInfo = "Extended rate: ₹249/day (13-29 days)";
    } else if (pricing.tier === "long-term") {
      pricingInfo = `Long-term rate: ₹${pricing.perDay}/day (31+ days)`;
    }

    const message = `I'm interested in renting the ${name}.

Rental Details:
Start Date: ${startDate.toLocaleDateString()}
End Date: ${endDate.toLocaleDateString()}
Duration: ${duration} ${duration === 1 ? "day" : "days"}

Pricing:
${pricingInfo}
Total Amount: ₹${pricing.total.toLocaleString()}

Please provide more details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    setCalendarOpen(false);
  };

  // Get current pricing to display
  const getCurrentPricing = () => {
    if (selectedPlan) {
      return {
        amount: selectedPlan.originalPrice,
        unit: `for ${selectedPlan.days} ${
          selectedPlan.days === 1 ? "day" : "days"
        }`,
        perDay: selectedPlan.perDay,
        note:
          selectedPlan.discount > 0
            ? `${selectedPlan.label} plan - ${selectedPlan.discount}% discount applied!`
            : selectedPlan.days === 1
            ? `${selectedPlan.label} plan - Premium convenience package!`
            : selectedPlan.days === 2
            ? `${selectedPlan.label} plan - Perfect for weekend adventures!`
            : `${selectedPlan.label} plan - Great value for longer rentals!`,
      };
    }
    return {
      amount: price,
      unit: "/day",
      perDay: price,
      note: "Base daily rate - Select a plan above for better deals!",
    };
  };

  // Determine special product types for custom styling
  const isTV = name === "TV";
  const isVR = name === "VR";
  const isGoPro = name === "Go Pro";
  const isAppleProduct = name.includes("iPad") || name.includes("Watch");

  // Get special image class based on product type
  const getSpecialImageClass = () => {
    if (isTV) return "tv-image";
    if (isVR) return "vr-image";
    if (isGoPro) return "gopro-image";
    if (isAppleProduct) return "apple-image";
    return "";
  };

  // Get special image class based on product type
  const getSpecialImgClass = () => {
    if (isTV) return "tv-img";
    if (isVR) return "vr-img";
    if (isGoPro) return "gopro-img";
    if (isAppleProduct) return "apple-img";
    return "";
  };

  // Check if this is a PS5 product
  const isPS5Product = () => {
    return name && name.toLowerCase().includes("ps5");
  };

  // Check if this is a PS5 combo product
  const isPS5ComboProduct = () => {
    return (
      name &&
      name.toLowerCase().includes("ps5") &&
      name.toLowerCase().includes("gaming wheel")
    );
  };

  // PS5-specific FAQs
  const ps5FAQs = [
    {
      question: "What games are included with PS5 rental?",
      answer:
        "Your PS5 rental includes access to 100+ free-to-play games from PlayStation Store! These include:\n• Casual and indie games for relaxed gaming\n• Simple multiplayer games for friends and family\n• Puzzle and strategy games\n• Family-friendly entertainment games\n\nThese are completely free games that don't require additional purchases. For premium AAA titles, you can purchase or rent games separately, or subscribe to PlayStation Plus for access to their game library.",
    },
    {
      question: "Do you provide setup assistance for PS5?",
      answer:
        "Absolutely! We provide complete setup assistance:\n• Free home delivery and professional setup\n• Connection to your TV/monitor with optimal settings\n• Account setup and game installation guidance\n• Controller pairing and calibration\n• Gaming tutorial for first-time users\n• 24/7 technical support during rental period\n\nOur team ensures you're ready to game within minutes of delivery!",
    },
    {
      question: "What's included in the PS5 rental package?",
      answer:
        "Your complete PS5 rental package includes:\n• Sony PlayStation 5 Console (Latest Model)\n• DualSense Wireless Controller with haptic feedback\n• High-speed HDMI cable for 4K gaming\n• Power adapter and all necessary cables\n• Access to 100+ game library\n• Free home delivery, setup, and pickup\n• Gaming guidance and technical support\n\nAdditional controllers and accessories available for separate rental.",
    },
    {
      question: "Can I extend my PS5 rental period?",
      answer:
        "Yes! Extending your PS5 rental is simple:\n• Message us on WhatsApp before your rental ends\n• Choose from our flexible extension options\n• Daily, weekly, or monthly extension rates available\n• No interruption to your gaming - seamless extension\n• Keep your saved games and progress\n\nExtensions are subject to availability. We recommend requesting extensions at least 24 hours before your rental period ends.",
    },
    {
      question: "What if the PS5 has technical issues during rental?",
      answer:
        "We've got you covered with comprehensive technical support:\n• 24/7 technical assistance via WhatsApp\n• Remote troubleshooting for software issues\n• Immediate replacement for hardware defects\n• No charges for manufacturer defects\n• Gaming guidance and optimization tips\n• Quick response time for all technical queries\n\nOur goal is to ensure uninterrupted gaming throughout your rental period.",
    },
    {
      question: "Are there any special deals for PS5 rentals?",
      answer:
        "Yes! We offer several money-saving deals:\n• Week Special: ₹2,499 (Save ₹4,494 vs daily rate)\n• Monthly Deal: ₹5,249 (41% discount - Save ₹3,721!)\n• Bundle deals with additional controllers\n• Seasonal promotions and festive offers\n• Loyalty discounts for repeat customers\n\nLonger rentals offer better value. Check our rental plans above for current pricing and special offers!",
    },
  ];

  // PS5 Combo-specific FAQs
  const ps5ComboFAQs = [
    {
      question: "What's included in the PS5 + Gaming Wheel combo rental?",
      answer:
        "Your complete PS5 + Gaming Wheel combo includes everything you need for the ultimate racing experience:\n• Sony PlayStation 5 Console (Latest Model)\n• Professional racing wheel with force feedback\n• Responsive pedal system for authentic racing\n• DualSense haptic controller\n• High-speed HDMI cable for 4K gaming\n• Power adapters and all necessary cables\n• Free home delivery, setup, and pickup\n• Gaming guidance and technical support\n\nPerfect for racing enthusiasts who want the complete sim racing setup!",
    },
    {
      question: "How much does the PS5 gaming wheel combo cost to rent?",
      answer:
        "PS5 + Gaming Wheel combo rental offers great value with flexible pricing:\n• Daily Rate: ₹499/day\n• Single Day Special: ₹1,499 (premium convenience package)\n• Weekend Package: ₹2,999 (weekend special package)\n• Week Special: ₹3,999 (30% discount!)\n• Monthly Deal: ₹7,999 (47% discount!)\n\nFor rentals longer than 20 days, we offer an even better rate of ₹399/day. All packages include free delivery and setup in Delhi NCR.",
    },
    {
      question: "Is the gaming wheel compatible with all PS5 racing games?",
      answer:
        "Yes! Our professional gaming wheel is fully compatible with all major PS5 racing games:\n• Gran Turismo 7 - The ultimate racing simulator\n• F1 23 and F1 24 - Official Formula 1 games\n• Need for Speed series - High-speed action racing\n• Dirt Rally and WRC games - Off-road racing\n• Assetto Corsa Competizione - Professional racing\n• And many more racing titles\n\nThe wheel features force feedback, precise steering, and responsive pedals for an authentic racing experience.",
    },
    {
      question: "Do you provide setup assistance for the racing wheel?",
      answer:
        "Absolutely! We provide complete setup and calibration assistance:\n• Professional delivery and setup service\n• Wheel mounting and positioning guidance\n• Pedal placement and adjustment\n• Force feedback calibration for optimal feel\n• Game-specific settings configuration\n• Racing tutorial for first-time users\n• 24/7 technical support during rental period\n\nOur team ensures your racing setup is perfect before we leave!",
    },
    {
      question: "Can I rent the PS5 and gaming wheel separately?",
      answer:
        "Yes, you can rent items separately if needed:\n• PS5 Console alone: ₹299/day\n• Gaming Wheel alone: ₹249/day\n• Total if rented separately: ₹548/day\n\nHowever, our combo package offers better value:\n• Combo price: ₹499/day (Save ₹49/day!)\n• Access to special discounted long-term plans\n• Guaranteed compatibility and professional setup\n• Single delivery for convenience\n\nThe combo ensures perfect integration and better overall experience.",
    },
    {
      question: "What racing games work best with this setup?",
      answer:
        "This combo excels with simulation and arcade racing games:\n\nSimulation Racing:\n• Gran Turismo 7 - Premium racing simulator\n• Assetto Corsa Competizione - Professional motorsport\n• F1 games - Official Formula 1 experience\n\nArcade Racing:\n• Need for Speed series - High-speed street racing\n• The Crew series - Open-world racing\n• Burnout Paradise - Crash and speed action\n\nOff-Road Racing:\n• Dirt Rally series - Rally championship\n• WRC games - World Rally Championship\n\nWe'll help you choose and set up the perfect games for your racing style!",
    },
  ];

  // Toggle FAQ expansion
  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  // Handle game image selection
  const handleGameImageSelect = (index) => {
    setSelectedGameImage(index);
  };

  const currentPricing = getCurrentPricing();

  return (
    <div className="product-detail-container">
      <SEO
        title={`${product.name} Rental Delhi NCR | ${product.price}${product.priceUnit} | Fast Delivery`}
        description={`🎮 Rent ${product.name} in Delhi NCR starting ${product.price}${product.priceUnit}! ⚡ Same-day delivery in 2-4 hours. 💰 Affordable rental rates. Free setup included!`}
        keywords={`${product.name} on rent near me, ${product.name} rental, ${product.category} rental Delhi NCR, ${product.name} rent, gaming console rental, affordable ${product.name} rental, ${product.name} rental near me, ${product.name} home delivery near me, rent ${product.name} nearby`}
        ogTitle={`${product.name} Rental Delhi NCR | ${product.price}${product.priceUnit}`}
        ogDescription={`🎮 Rent ${product.name} in Delhi NCR starting ${product.price}${product.priceUnit}! ⚡ Same-day delivery in 2-4 hours.`}
        ogImage={product.image}
        twitterTitle={`${product.name} Rental Delhi NCR | ${product.price}${product.priceUnit}`}
        twitterDescription={`🎮 Rent ${product.name} starting ${product.price}${product.priceUnit}! ⚡ Same-day delivery in Delhi NCR.`}
        canonical={`https://rentsmart.in/product/${product.id}`}
        ogType="product"
        ogUrl={`https://rentsmart.in/product/${product.id}`}
      />

      <div className="product-detail-header">
        <button onClick={() => navigate("/")} className="back-button">
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
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Products
        </button>
      </div>

      <div className="product-detail-content">
        <div className="product-detail-image-section">
          <div
            className={`product-detail-image ${
              !imageLoaded ? "loading" : ""
            } ${getSpecialImageClass()}`}
          >
            <img
              src={image}
              alt={`${name} - ${description}`}
              className={getSpecialImgClass()}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div
                className="image-loading-placeholder"
                aria-hidden="true"
              ></div>
            )}
          </div>
        </div>

        <div className="product-detail-info">
          <div className="product-detail-category">
            <span className="category-badge">{category}</span>
          </div>

          <h1 className="product-detail-title">{name}</h1>

          <p className="product-detail-description">{description}</p>

          {features && features.length > 0 && (
            <div className="product-detail-features">
              <h3>Key Features</h3>
              <div className="features-list">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rental Plans Section */}
          <div className="product-detail-rental-plans">
            <h3>Rental Plans</h3>
            <div className="rental-plans-grid">
              {RENTAL_PLANS.map((plan) => (
                <div
                  key={plan.key}
                  className={`rental-plan-card ${
                    selectedPlan?.key === plan.key ? "selected" : ""
                  }`}
                  onClick={() => handlePlanSelect(plan)}
                >
                  <div className="plan-header">
                    <h4>{plan.label}</h4>
                    <span className="plan-duration">
                      {plan.days} {plan.days === 1 ? "day" : "days"}
                    </span>
                  </div>
                  <div className="plan-price">
                    <span className="price-starting">Total Price</span>
                    <span className="price-amount">{plan.price}</span>
                    {plan.discount > 0 && (
                      <span className="discount-badge">
                        {plan.discount}% OFF
                      </span>
                    )}
                    <span className="per-day-price">
                      {shouldShowSlashedPrice(plan.days, plan.perDay) ? (
                        <span className="slashed-pricing">
                          <span className="original-price">
                            ₹{getBaseDailyRate()}
                          </span>
                          <span className="discounted-price">
                            ₹{plan.perDay}
                          </span>
                          <span className="per-day-text">/day</span>
                        </span>
                      ) : (
                        <span className="regular-pricing">
                          <span className="current-price">₹{plan.perDay}</span>
                          <span className="per-day-text">/day</span>
                        </span>
                      )}
                    </span>
                  </div>

                  {plan.tier === "ps5-week-special" && (
                    <div className="special-offer">
                      <span>🎮 PS5 Week Special!</span>
                    </div>
                  )}
                  {plan.tier === "30-day-ps5-special" && (
                    <div className="special-offer">
                      <span>🎮 PS5 Monthly Deal!</span>
                    </div>
                  )}
                  {plan.tier === "30-day-special" && (
                    <div className="special-offer">
                      <span>🎉 Monthly Discount!</span>
                    </div>
                  )}
                  {selectedPlan?.key === plan.key && (
                    <div className="selected-indicator">
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
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="rental-plans-note">
              * Click on a plan to select it and see updated pricing below
            </p>
          </div>

          <div className="product-detail-pricing">
            <div className="price-section">
              <div className="price-display">
                <span className="price-amount">
                  ₹{currentPricing.amount.toLocaleString()}
                </span>
                <span className="price-unit">{currentPricing.unit}</span>
              </div>
              {selectedPlan &&
                selectedPlan.perDay !== currentPricing.amount && (
                  <div className="per-day-display">
                    <span className="per-day-text">
                      {shouldShowSlashedPrice(
                        selectedPlan.days,
                        selectedPlan.perDay
                      ) ? (
                        <span className="slashed-pricing">
                          <span className="original-price">
                            ₹{getBaseDailyRate()}
                          </span>
                          <span className="discounted-price">
                            ₹{currentPricing.perDay}
                          </span>
                          <span className="per-day-text">/day</span>
                        </span>
                      ) : (
                        <span className="regular-pricing">
                          <span className="current-price">
                            ₹{currentPricing.perDay}
                          </span>
                          <span className="per-day-text">/day</span>
                        </span>
                      )}
                    </span>
                  </div>
                )}
              <p className="price-note">{currentPricing.note}</p>
            </div>

            <button
              className="rent-now-detail-button"
              onClick={handleRentAction}
            >
              {selectedPlan ? `Rent ${selectedPlan.label}` : "Rent Now"}
            </button>
          </div>

          {/* PS5 Games Gallery - Show below the Rent Now button */}
          {isPS5Product() && (
            <div className="ps5-games-gallery">
              <div className="games-gallery-header">
                <h4>🎮 Popular Free Games Included!</h4>
                <p className="games-gallery-subtitle">
                  Your PS5 rental includes access to these popular free-to-play
                  games and 100+ more from PlayStation Store
                </p>
              </div>

              <div className="games-gallery-container">
                {/* Thumbnails on the left */}
                <div className="games-thumbnails">
                  {ps5GameImages.map((game, index) => (
                    <div
                      key={index}
                      className={`game-thumbnail ${
                        selectedGameImage === index ? "active" : ""
                      }`}
                      onClick={() => handleGameImageSelect(index)}
                    >
                      <img src={game.src} alt={game.alt} loading="lazy" />
                      <div className="thumbnail-overlay">
                        <span className="game-title">{game.title}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main image on the right */}
                <div className="games-main-image">
                  <div className="main-image-container">
                    <img
                      src={ps5GameImages[selectedGameImage].src}
                      alt={ps5GameImages[selectedGameImage].alt}
                      loading="lazy"
                    />
                    <div className="main-image-overlay">
                      <h5>{ps5GameImages[selectedGameImage].title}</h5>
                      <span className="free-badge">FREE TO PLAY</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="games-gallery-description">
                <p>
                  Enjoy these popular free-to-play games plus 100+ more
                  including casual games, indie titles, and simple multiplayer
                  games. Perfect for entertainment without additional costs!
                </p>
                <div className="games-highlights">
                  <span className="game-tag">🎮 Free-to-Play Games</span>
                  <span className="game-tag">🎯 Casual Gaming</span>
                  <span className="game-tag">👥 Simple Multiplayer</span>
                  <span className="game-tag">👨‍👩‍👧‍👦 Family-Friendly</span>
                </div>
              </div>
            </div>
          )}

          <div className="product-detail-info-cards">
            <div className="info-card">
              <div className="info-icon">
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
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3" />
                  <path d="M13 12h3" />
                  <path d="M8 12H5" />
                </svg>
              </div>
              <div className="info-content">
                <h4>Quality Guaranteed</h4>
                <p>All products thoroughly tested and sanitized</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
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
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="info-content">
                <h4>Free Delivery</h4>
                <p>White glove delivery and pickup service</p>
              </div>
            </div>
          </div>

          {/* PS5 FAQ Section - Show specific FAQs based on product type */}
          {isPS5Product() && (
            <div className="product-detail-faq-section">
              <h3>
                {isPS5ComboProduct()
                  ? "PS5 + Gaming Wheel Combo FAQs"
                  : "PS5 Rental FAQs"}
              </h3>

              <div className="product-faq-grid">
                {(isPS5ComboProduct() ? ps5ComboFAQs : ps5FAQs).map(
                  (faq, index) => (
                    <div
                      key={index}
                      className={`product-faq-item ${
                        expandedFAQ === index ? "expanded" : ""
                      }`}
                      onClick={() => toggleFAQ(index)}
                    >
                      <div className="product-faq-question">
                        <h4>{faq.question}</h4>
                        <span className="product-faq-icon">
                          {expandedFAQ === index ? "−" : "+"}
                        </span>
                      </div>
                      <div
                        className={`product-faq-answer ${
                          expandedFAQ === index ? "show" : ""
                        }`}
                      >
                        {faq.answer.split("\n").map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="faq-cta">
                <p>
                  {isPS5ComboProduct()
                    ? "Have more questions about PS5 gaming wheel combo?"
                    : "Have more questions about PS5 rental?"}
                </p>
                <a
                  href={
                    isPS5ComboProduct()
                      ? "https://wa.me/918448347366?text=Hi%20RentSmart%20Team!%20I%20have%20questions%20about%20PS5%20gaming%20wheel%20combo%20rental.%20Could%20you%20please%20help%20me?"
                      : "https://wa.me/918448347366?text=Hi%20RentSmart%20Team!%20I%20have%20questions%20about%20PS5%20rental.%20Could%20you%20please%20help%20me?"
                  }
                  className="faq-cta-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rental Calendar Component */}
      <RentalCalendar
        isOpen={calendarOpen}
        onClose={handleCloseCalendar}
        onConfirm={handleRentalConfirm}
        productName={product?.name}
        productCategory={product?.category}
        price={product?.price}
        priceUnit={product?.priceUnit}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductDetail;
