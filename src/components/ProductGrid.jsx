import React, { useState } from "react";
import ProductCard from "./ProductCard";
import RentalCalendar from "./RentalCalendar";

const ProductGrid = ({ products, onCalendarStateChange }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  // Filter products based on selected category
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  const handleOpenCalendar = (product) => {
    setSelectedProduct(product);
    setCalendarOpen(true);
    // Notify parent component about calendar state change
    onCalendarStateChange?.(true);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
    setSelectedProduct(null);
    // Notify parent component about calendar state change
    onCalendarStateChange?.(false);
  };

  const handleRentalConfirm = (startDate, endDate, duration, pricing) => {
    if (!selectedProduct) return;
    const { name } = selectedProduct;
    const phoneNumber = "918448347366";

    // Format the pricing tier information
    let pricingInfo = "";
    if (pricing.tier === "adventure-single-day") {
      pricingInfo = `Adventure daily rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-two-days") {
      pricingInfo = `Adventure rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-short-term") {
      pricingInfo = `Adventure short-term: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-week-special") {
      pricingInfo = "Adventure Week Special (10% discount!)";
    } else if (pricing.tier === "adventure-extended") {
      pricingInfo = `Adventure extended rate: ₹${pricing.perDay}/day`;
    } else if (pricing.tier === "adventure-month-special") {
      pricingInfo = "Adventure Monthly Special (20% discount!)";
    } else if (pricing.tier === "single-day") {
      pricingInfo = "Single day rate: ₹1,000";
    } else if (pricing.tier === "two-days") {
      pricingInfo = "Two day rate: ₹1,000/day";
    } else if (pricing.tier === "long-term") {
      pricingInfo = `Long-term rate: ₹${pricing.perDay}/day (3+ days)`;
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
    setSelectedProduct(null);
    // Notify parent component about calendar state change
    onCalendarStateChange?.(false);
  };

  return (
    <div className="product-section">
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onRentNow={handleOpenCalendar}
          />
        ))}
      </div>

      <RentalCalendar
        isOpen={calendarOpen}
        onClose={handleCloseCalendar}
        onConfirm={handleRentalConfirm}
        productName={selectedProduct?.name}
        productCategory={selectedProduct?.category}
        price={selectedProduct?.price}
        priceUnit={selectedProduct?.priceUnit}
      />
    </div>
  );
};

export default ProductGrid;
