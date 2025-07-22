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
}) => {
  useEffect(() => {
    // Update page title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = description;
    }

    // Update keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.name = "keywords";
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // Update Open Graph title
    if (ogTitle) {
      let ogTitleMeta = document.querySelector('meta[property="og:title"]');
      if (!ogTitleMeta) {
        ogTitleMeta = document.createElement("meta");
        ogTitleMeta.setAttribute("property", "og:title");
        document.head.appendChild(ogTitleMeta);
      }
      ogTitleMeta.content = ogTitle;
    }

    // Update Open Graph description
    if (ogDescription) {
      let ogDescMeta = document.querySelector(
        'meta[property="og:description"]'
      );
      if (!ogDescMeta) {
        ogDescMeta = document.createElement("meta");
        ogDescMeta.setAttribute("property", "og:description");
        document.head.appendChild(ogDescMeta);
      }
      ogDescMeta.content = ogDescription;
    }

    // Update Open Graph image
    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImageMeta) {
        ogImageMeta = document.createElement("meta");
        ogImageMeta.setAttribute("property", "og:image");
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.content = ogImage;
    }

    // Update Twitter title
    if (twitterTitle) {
      let twitterTitleMeta = document.querySelector(
        'meta[name="twitter:title"]'
      );
      if (!twitterTitleMeta) {
        twitterTitleMeta = document.createElement("meta");
        twitterTitleMeta.name = "twitter:title";
        document.head.appendChild(twitterTitleMeta);
      }
      twitterTitleMeta.content = twitterTitle;
    }

    // Update Twitter description
    if (twitterDescription) {
      let twitterDescMeta = document.querySelector(
        'meta[name="twitter:description"]'
      );
      if (!twitterDescMeta) {
        twitterDescMeta = document.createElement("meta");
        twitterDescMeta.name = "twitter:description";
        document.head.appendChild(twitterDescMeta);
      }
      twitterDescMeta.content = twitterDescription;
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.rel = "canonical";
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.href = canonical;
    }
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
  ]);

  return null; // This component doesn't render anything
};

export default SEO;
