import React, { useEffect } from "react";

const SEO = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogImage = "/images/sony_ps5.jpg",
  twitterTitle,
  twitterDescription,
  canonical,
  ogType = "website",
  ogUrl,
}) => {
  useEffect(() => {
    // Helper function to create or update meta tags
    const updateMetaTag = (selector, attribute, attributeValue, content) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, attributeValue);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper function to create or update link tags
    const updateLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Update page title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      updateMetaTag(
        'meta[name="description"]',
        "name",
        "description",
        description
      );
    }

    // Update keywords
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // Add robots meta if not exists
    if (!document.querySelector('meta[name="robots"]')) {
      updateMetaTag(
        'meta[name="robots"]',
        "name",
        "robots",
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      );
    }

    // Add viewport meta if not exists
    if (!document.querySelector('meta[name="viewport"]')) {
      updateMetaTag(
        'meta[name="viewport"]',
        "name",
        "viewport",
        "width=device-width, initial-scale=1.0"
      );
    }

    // Convert relative URLs to absolute for social sharing
    const getAbsoluteUrl = (url) => {
      if (url.startsWith("http")) return url;
      return `${window.location.origin}${url}`;
    };

    // Open Graph tags
    if (ogTitle) {
      updateMetaTag(
        'meta[property="og:title"]',
        "property",
        "og:title",
        ogTitle
      );
    }

    if (ogDescription) {
      updateMetaTag(
        'meta[property="og:description"]',
        "property",
        "og:description",
        ogDescription
      );
    }

    if (ogImage) {
      updateMetaTag(
        'meta[property="og:image"]',
        "property",
        "og:image",
        getAbsoluteUrl(ogImage)
      );
    }

    // Add missing essential Open Graph properties
    updateMetaTag('meta[property="og:type"]', "property", "og:type", ogType);
    updateMetaTag(
      'meta[property="og:site_name"]',
      "property",
      "og:site_name",
      "RentSmart"
    );

    if (ogUrl) {
      updateMetaTag(
        'meta[property="og:url"]',
        "property",
        "og:url",
        getAbsoluteUrl(ogUrl)
      );
    } else {
      updateMetaTag(
        'meta[property="og:url"]',
        "property",
        "og:url",
        window.location.href
      );
    }

    // Twitter Card tags
    updateMetaTag(
      'meta[name="twitter:card"]',
      "name",
      "twitter:card",
      "summary_large_image"
    );

    if (twitterTitle) {
      updateMetaTag(
        'meta[name="twitter:title"]',
        "name",
        "twitter:title",
        twitterTitle
      );
    }

    if (twitterDescription) {
      updateMetaTag(
        'meta[name="twitter:description"]',
        "name",
        "twitter:description",
        twitterDescription
      );
    }

    // Twitter image (use same as og:image)
    if (ogImage) {
      updateMetaTag(
        'meta[name="twitter:image"]',
        "name",
        "twitter:image",
        getAbsoluteUrl(ogImage)
      );
    }

    // Update canonical URL
    if (canonical) {
      updateLinkTag("canonical", getAbsoluteUrl(canonical));
    }

    // Add generator meta
    updateMetaTag(
      'meta[name="generator"]',
      "name",
      "generator",
      "RentSmart React App"
    );
  }, [
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    canonical,
    ogType,
    ogUrl,
  ]);

  return null; // This component doesn't render anything
};

export default SEO;
