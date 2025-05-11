import React, { useState } from "react";
import ProductCard from "./ProductCard";
import RentalCalendar from "./RentalCalendar";

const ProductGrid = ({ products }) => {
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
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);
    setSelectedProduct(null);
  };

  const handleRentalConfirm = (startDate, endDate, duration) => {
    if (!selectedProduct) return;
    const { name, price, priceUnit } = selectedProduct;
    const phoneNumber = "918448347366";
    const message = `I'm interested in renting the ${name} at ₹${price}/${priceUnit}.\n\nRental Details:\nStart Date: ${startDate.toLocaleDateString()}\nEnd Date: ${endDate.toLocaleDateString()}\nDuration: ${duration} days\nTotal Amount: ₹${
      price * duration
    }\n\nPlease provide more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
    setCalendarOpen(false);
    setSelectedProduct(null);
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
        price={selectedProduct?.price}
        priceUnit={selectedProduct?.priceUnit}
      />
    </div>
  );
};

export default ProductGrid;
