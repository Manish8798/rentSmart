import React from "react";

const ProductCard = ({ product }) => {
  const { name, description, price, image, priority } = product;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={`${window.location.origin}${image}`} alt={name} />
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
