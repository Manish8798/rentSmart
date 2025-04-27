import React, { useState } from "react";

const ProductCard = ({ product }) => {
  const { name, description, price, image, priority } = product;
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

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

  return (
    <div className="product-card">
      <div
        className={`product-image ${
          !imageLoaded ? "loading" : ""
        } ${getSpecialImageClass()}`}
      >
        <img
          src={`${window.location.origin}${image}`}
          alt={name}
          onLoad={handleImageLoad}
          loading="lazy"
          className={getSpecialImgClass()}
        />
        {!imageLoaded && <div className="image-loading-placeholder"></div>}
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
