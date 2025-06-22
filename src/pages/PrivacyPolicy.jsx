import React from "react";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <div className="container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="privacy-subtitle">Because your privacy matters!</p>
        </div>

        <div className="privacy-content">
          <div className="table-of-contents">
            <h2>Table of Contents:</h2>
            <ol>
              <li>
                <a href="#introduction">INTRODUCTION</a>
              </li>
              <li>
                <a href="#collection-info">COLLECTION OF PERSONAL INFO</a>
              </li>
              <li>
                <a href="#use-cookies">USE OF COOKIES & WEBSITE ANALYTICS</a>
              </li>
              <li>
                <a href="#payment-gateway">RENTAL INQUIRIES & COMMUNICATION</a>
              </li>
              <li>
                <a href="#data-security">DATA SECURITY & RETENTION</a>
              </li>
              <li>
                <a href="#contact-privacy">PRIVACY CONCERNS & CONTACT</a>
              </li>
            </ol>
          </div>

          <section id="introduction" className="privacy-section">
            <h2>1. INTRODUCTION:</h2>
            <p>
              This privacy policy covers the practices for handling and securing
              your personal information by RentSmart (hereinafter referred to as
              "RentSmart"). The domain name and website (hereinafter referred to
              as the "Website"), is owned by RentSmart, a Company having its
              operations based in Delhi, India.
            </p>
            <p>
              This Privacy Policy is applicable to persons who browse our
              website and express interest in renting products through our
              WhatsApp-based communication system. RentSmart operates as a
              product showcase website that connects customers with our rental
              services through direct communication channels.
            </p>
            <p>
              When browsing our Website, you are not required to provide any
              Personal Information. Our website serves as a product catalog and
              information platform. Any personal information sharing occurs only
              when you voluntarily contact us through WhatsApp or other
              communication channels for rental inquiries.
            </p>
          </section>

          <section id="collection-info" className="privacy-section">
            <h2>2. COLLECTION OF PERSONAL INFO:</h2>
            <p>
              RentSmart's website operates as a product showcase and information
              platform. We do not require user registration or account creation
              to browse our products. When you express interest in renting a
              product, you will be directed to WhatsApp where you may
              voluntarily share personal information such as your name, phone
              number, address, and rental preferences to facilitate the rental
              process.
            </p>
            <p>
              When you browse our Website, our servers may automatically record
              basic technical information including your IP address, browser
              type, device information, pages visited, and access times. This
              information is used solely for website analytics, performance
              monitoring, and technical administration. We do not link this
              automatically collected data to any personally identifiable
              information.
            </p>
            <p>
              If you use our contact form, the information is formatted and sent
              to our WhatsApp for processing. We do not store contact form
              submissions on our servers. Any personal information you share
              during WhatsApp communications is handled according to WhatsApp's
              privacy policy and our commitment to protecting your privacy
              during the rental process.
            </p>
          </section>

          <section id="use-cookies" className="privacy-section">
            <h2>3. USE OF COOKIES & WEBSITE ANALYTICS:</h2>
            <p>
              Cookies are small pieces of information that are stored by your
              browser on your device's hard drive. Our website uses minimal
              cookies primarily for basic functionality such as maintaining your
              browsing session and remembering your preferences while navigating
              our product catalog.
            </p>
            <p>
              We do not use cookies to store any personally identifiable
              information. Our cookies are used only for technical purposes such
              as website performance optimization and basic analytics to
              understand how visitors interact with our product showcase. We do
              not use advertising cookies or share cookie data with third
              parties for marketing purposes. You can disable cookies in your
              browser settings without affecting your ability to browse our
              products and access our WhatsApp communication.
            </p>
          </section>

          <section id="payment-gateway" className="privacy-section">
            <h2>4. RENTAL INQUIRIES & COMMUNICATION:</h2>
            <p>
              When you express interest in renting a product through our
              Website, you will be redirected to WhatsApp to communicate
              directly with our team. This allows us to provide personalized
              service and answer any questions you may have about the rental
              process, pricing, and availability.
            </p>
            <p>
              All rental transactions, payments, and related communications are
              handled through direct communication channels (WhatsApp, phone
              calls, or in-person meetings). The Website itself does not process
              any payments or store any payment-related information. Any
              personal or financial information you share during the rental
              process is handled according to our privacy practices outlined in
              this policy.
            </p>
            <p>
              By using our WhatsApp communication service, you acknowledge that
              WhatsApp has its own privacy policy and terms of service. We
              recommend reviewing WhatsApp's privacy policy to understand how
              they handle your communications and data.
            </p>
          </section>

          <section id="data-security" className="privacy-section">
            <h2>5. DATA SECURITY & RETENTION:</h2>
            <p>
              We are committed to protecting any personal information you share
              with us during the rental process. Since our website operates as a
              product showcase without user accounts or stored personal data,
              most of your information is communicated directly through WhatsApp
              and other secure communication channels.
            </p>
            <p>
              Any personal information shared during rental communications is
              kept confidential and used solely for the purpose of providing
              rental services. We do not sell, trade, or share your personal
              information with third parties for marketing purposes. Information
              is retained only as long as necessary to complete the rental
              transaction and provide customer support.
            </p>
            <p>
              We implement reasonable security measures to protect against
              unauthorized access to or disclosure of your information. However,
              please note that no method of transmission over the internet or
              electronic storage is 100% secure.
            </p>
          </section>

          <section id="contact-privacy" className="privacy-section">
            <h2>6. PRIVACY CONCERNS & CONTACT:</h2>
            <p>
              If you have any questions about this Privacy Policy or concerns
              about how your personal information is handled, please contact us:
            </p>
            <p>
              <strong>Email:</strong> rentsmart007@gmail.com
              <br />
              <strong>WhatsApp:</strong> +91 84483 47366
              <br />
              <strong>Business Hours:</strong> Available 24/7 for WhatsApp
              inquiries
            </p>
            <p>
              We reserve the right to update this Privacy Policy from time to
              time to reflect changes in our practices or legal requirements.
              Any updates will be posted on this page with an updated effective
              date. We encourage you to review this policy periodically.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
