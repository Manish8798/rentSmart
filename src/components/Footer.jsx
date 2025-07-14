import React from "react";
import { useTranslation } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-circle" aria-hidden="true">
              <span>RS</span>
            </div>
            <h3>RentSmart</h3>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div className="footer-column">
              <h4>{t("footer.company")}</h4>
              <ul>
                <li>
                  <a href="/about" aria-label="About RentSmart">
                    {t("footer.aboutUs")}
                  </a>
                </li>
                <li>
                  <a href="/blog" aria-label="Read our blog">
                    {t("mobileMenu.blogs")}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:rentsmart007@gmail.com"
                    aria-label="Contact RentSmart for career opportunities"
                  >
                    {t("footer.careers")}
                  </a>
                </li>
                <li>
                  <a href="/contact" aria-label="Contact RentSmart">
                    {t("footer.contactUs")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>{t("footer.products")}</h4>
              <ul>
                <li>
                  <a href="/#products-section">{t("categories.gaming")}</a>
                </li>
                <li>
                  <a href="/#products-section">{t("categories.apple")}</a>
                </li>
                <li>
                  <a href="/#products-section">{t("categories.home")}</a>
                </li>
                <li>
                  <a href="/#products-section">{t("categories.adventure")}</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>{t("footer.support")}</h4>
              <ul>
                <li>
                  <a
                    href="mailto:rentsmart007@gmail.com"
                    aria-label="Get help from RentSmart"
                  >
                    {t("footer.helpCenter")}
                  </a>
                </li>
                <li>
                  <a href="/faq">{t("mobileMenu.faqs")}</a>
                </li>
                <li>
                  <a href="mailto:rentsmart007@gmail.com">
                    {t("footer.shipping")}
                  </a>
                </li>
                <li>
                  <a href="mailto:rentsmart007@gmail.com">
                    {t("footer.returns")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>{t("footer.policies")}</h4>
              <ul>
                <li>
                  <a href="/terms" aria-label="Terms and Conditions">
                    {t("footer.termsConditions")}
                  </a>
                </li>
                <li>
                  <a href="/privacy" aria-label="Privacy Policy">
                    {t("footer.privacyPolicy")}
                  </a>
                </li>
                <li>
                  <a href="/shipping-policy" aria-label="Shipping Policy">
                    {t("footer.shippingPolicy")}
                  </a>
                </li>
                <li>
                  <a href="/damage-policy" aria-label="Damage Policy">
                    {t("footer.damagePolicy")}
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
