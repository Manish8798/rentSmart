import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  const [activeCategory, setActiveCategory] = useState("All");

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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
