import React from "react";
import Footer from "../components/Footer";

const DamagePolicy = () => {
  return (
    <div className="damage-policy">
      <div className="container">
        <div className="damage-header">
          <h1>Damage Policy</h1>
          <p className="damage-subtitle">
            We understand, sometimes things go wrong!
          </p>
        </div>

        <div className="damage-content">
          <div className="table-of-contents">
            <h2>Table of Contents:</h2>
            <ol>
              <li>
                <a href="#general-policy">GENERAL POLICY</a>
              </li>
              <li>
                <a href="#what-is-damage">WHAT IS CONSIDERED AS DAMAGE?</a>
              </li>
              <li>
                <a href="#missing-policy">MISSING POLICY</a>
              </li>
              <li>
                <a href="#damage-policy">DAMAGE POLICY</a>
              </li>
              <li>
                <a href="#non-compliance">NON-COMPLIANCE</a>
              </li>
            </ol>
          </div>

          <section id="general-policy" className="damage-section">
            <h2>1. GENERAL POLICY:</h2>
            <p>
              In case of any damage or missing product(s), the company will
              inform you upon receiving the product back. The customer agrees to
              pay for any damage to, loss of, or theft (disappearance) of items,
              regardless of cause or fault.
            </p>
          </section>

          <section id="what-is-damage" className="damage-section">
            <h2>2. WHAT IS CONSIDERED AS DAMAGE?:</h2>
            <p>
              Any permanent change in the physical appearance of the product or
              any change or loss of functionality is considered damage. Minor
              wear & tear due to general usage is not considered damage.
            </p>
          </section>

          <section id="missing-policy" className="damage-section">
            <h2>3. MISSING POLICY:</h2>

            <div className="policy-item">
              <h3>1. Liability:</h3>
              <p>
                For any missing item, the customer is liable for up to 90% of
                the retail price, depending on the product's usage age.
              </p>
            </div>

            <div className="policy-item">
              <h3>2. Return of Missing Product:</h3>
              <ul>
                <li>
                  If the customer is willing to return the missing product, the
                  RentSmart team will arrange pickup.
                </li>
                <li>
                  The customer is liable to pay a ₹299 shipping charge for the
                  return.
                </li>
              </ul>
            </div>

            <div className="policy-item">
              <h3>3. Lost Item Replacement:</h3>
              <ul>
                <li>
                  The customer can buy and send a product of the same brand
                  along with an invoice. (and warranty card if applicable)
                </li>
              </ul>
            </div>
          </section>

          <section id="damage-policy" className="damage-section">
            <h2>4. DAMAGE POLICY:</h2>

            <div className="policy-item">
              <h3>1. Repairable Damage:</h3>
              <p>
                The customer has to pay the repair cost and a service charge as
                per the repair invoice.
              </p>
            </div>

            <div className="policy-item">
              <h3>2. Irreparable Damage:</h3>
              <p>
                For any irreparably damaged item, the customer is liable for up
                to 90% of the retail price, depending on the product's usage
                age.
              </p>
            </div>
          </section>

          <section id="non-compliance" className="damage-section">
            <h2>5. NON-COMPLIANCE:</h2>
            <p>
              If the customer fails to follow the policy, RentSmart will proceed
              with legal action.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DamagePolicy;
