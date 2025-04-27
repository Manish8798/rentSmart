import React from "react";

const ProductCard = ({ product }) => {
  const { name, description, price, image, priority } = product;

  const priorityClass =
    priority === "High"
      ? "priority-high"
      : priority === "Medium"
      ? "priority-medium"
      : "priority-low";

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={name} />
        <span className={`priority-badge ${priorityClass}`}>{priority}</span>
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">${price}/month</span>
          <button className="rent-button">Rent Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
