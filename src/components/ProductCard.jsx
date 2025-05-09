import React, { useState, useEffect } from "react";

const ProductCard = ({ product, onRentNow }) => {
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
    <article
      className="product-card"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div
        className={`product-image ${
          !imageLoaded ? "loading" : ""
        } ${getSpecialImageClass()}`}
      >
        {imageSrc && (
          <img
            src={imageSrc}
            alt={`${name} - ${description}`}
            loading="lazy"
            className={getSpecialImgClass()}
            onLoad={() => setImageLoaded(true)}
            itemProp="image"
          />
        )}
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
            <span itemProp="price" content={price}>
              ₹{price}
            </span>
            <span itemProp="priceCurrency" content="INR">
              /{priceUnit}
            </span>
          </div>
          <button
            className="rent-button"
            onClick={() => onRentNow(product)}
            aria-label={`Rent ${name} for ₹${price} per ${priceUnit}`}
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
