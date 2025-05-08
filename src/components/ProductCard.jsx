import React, { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
  const { name, description, price, image, priority } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = image;
    img.onload = () => {
      setImageSrc(image);
      setImageLoaded(true);
    };
    img.onerror = () => {
      // Fallback to a placeholder if image fails to load
      setImageSrc("/images/placeholder.jpg");
      setImageLoaded(true);
    };
  }, [image]);

  const handleRentNow = () => {
    const phoneNumber = "917053911337"; // Remove the + symbol for WhatsApp web links
    const message = `I'm interested in renting the ${name}. Please provide more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
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
        {imageSrc && (
          <img
            src={imageSrc}
            alt={name}
            loading="lazy"
            className={getSpecialImgClass()}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {!imageLoaded && <div className="image-loading-placeholder"></div>}
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">${price}/month</span>
          <button className="rent-button" onClick={handleRentNow}>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
