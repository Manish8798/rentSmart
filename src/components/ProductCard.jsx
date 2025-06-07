import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, onRentNow }) => {
  const navigate = useNavigate();
  const {
    name,
    description,
    price,
    priceUnit,
    image,
    priority,
    category,
    features,
  } = product;
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine special product types for custom styling
  const isTV = name === "TV";
  const isVR = name === "VR";
  const isGoPro = name === "Go Pro";
  const isAppleProduct = name.includes("iPad") || name.includes("Watch");

  // Get special class based on product type
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

  const handleCardClick = (e) => {
    // Prevent navigation if clicking on the rent button
    if (e.target.closest(".rent-button")) {
      return;
    }
    navigate(`/product/${product.id}`);
  };

  return (
    <article
      className="product-card clickable"
      itemScope
      itemType="https://schema.org/Product"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div
        className={`product-image ${
          !imageLoaded ? "loading" : ""
        } ${getSpecialImageClass()}`}
      >
        <img
          src={image}
          alt={`${name} - ${description}`}
          loading="lazy"
          className={getSpecialImgClass()}
          onLoad={() => setImageLoaded(true)}
          itemProp="image"
        />
        {!imageLoaded && (
          <div className="image-loading-placeholder" aria-hidden="true"></div>
        )}
      </div>
      <div className="product-info">
        <h3 itemProp="name">{name}</h3>
        <p className="product-description" itemProp="description">
          {description}
        </p>
        {features && features.length > 0 && (
          <div className="product-features">
            {features.map((feature, index) => (
              <span key={index} className="feature-tag">
                {feature}
              </span>
            ))}
          </div>
        )}
        <div className="product-footer">
          <div
            className="product-price"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <div className="tiered-pricing">
              <div className="price-line">
                <span itemProp="price" content={price}>
                  ₹{price}
                </span>
                <span className="price-unit">/day</span>
              </div>
            </div>
            <meta itemProp="priceCurrency" content="INR" />
          </div>
          <button
            className="rent-button"
            onClick={() => onRentNow(product)}
            aria-label={`Rent ${name} - Tiered pricing available`}
          >
            Rent Now
          </button>
        </div>
        <meta itemProp="category" content={category} />
      </div>
    </article>
  );
};

export default ProductCard;
