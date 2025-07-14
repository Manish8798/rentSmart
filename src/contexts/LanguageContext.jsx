import React, { createContext, useState, useContext, useEffect } from "react";
import translations from "../data/translations";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const useTranslation = () => {
  const { language, translations: trans } = useLanguage();

  const t = (key, params = {}) => {
    const keys = key.split(".");
    let value = trans[language];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        // Fallback to English if key not found in current language
        let fallback = trans["en"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object") {
            fallback = fallback[fk];
          } else {
            fallback = key; // Ultimate fallback to the key itself
            break;
          }
        }
        value = fallback;
        break;
      }
    }

    // Handle parameterized strings
    if (typeof value === "string" && Object.keys(params).length > 0) {
      return Object.keys(params).reduce((str, param) => {
        return str.replace(new RegExp(`{{${param}}}`, "g"), params[param]);
      }, value);
    }

    return value || key;
  };

  return { t };
};

export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("rentsmart-language");
    return saved || "en";
  });

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("rentsmart-language", language);

    // Update document lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
