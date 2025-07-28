import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalCalendar = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  productCategory,
  price,
  priceUnit,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("single");

  // Default rental duration in days (1 month = 30 days)
  const DEFAULT_RENTAL_DAYS = 30;

  // Rental plans configuration
  const RENTAL_PLANS = {
    single: { label: "Single Day", days: 1 },
    weekend: { label: "Weekend", days: 2 },
    week: { label: "Week", days: 7 },
    month: { label: "Month", days: 30 },
  };

  // Function to convert price to xx9 format
  const convertToXX9Format = (price) => {
    if (price === 0) return 0;
    const lastDigit = price % 10;
    if (lastDigit === 9) return price;

    // Round to nearest number ending in 9
    const lowerOption = price - lastDigit - 1;
    const upperOption = price - lastDigit + 9;

    // Choose the closer option, preferring the lower one in case of tie
    if (Math.abs(price - lowerOption) <= Math.abs(price - upperOption)) {
      return Math.max(lowerOption, 9); // Ensure minimum price of 9
    } else {
      return upperOption;
    }
  };

  // Function to format price with commas
  const formatPrice = (price) => {
    return price.toLocaleString("en-IN");
  };

  // Check if product is an adventure item
  const isAdventureItem = () => {
    return productCategory === "Adventure";
  };

  // Function to get the base daily rate for comparison
  const getBaseDailyRate = () => {
    // For PS5 + Gaming Wheel combo, the base rate is 499/day
    if (
      productName &&
      productName.toLowerCase().includes("ps5") &&
      productName.toLowerCase().includes("gaming wheel")
    ) {
      return 499;
    }
    // For PS5, the base rate is 299/day
    if (productName && productName.toLowerCase().includes("ps5")) {
      return 299;
    }
    // For other products, use the passed price as base rate
    return price;
  };

  // Function to check if we should show slashed pricing
  const shouldShowSlashedPrice = (duration, currentPerDay) => {
    const baseDailyRate = getBaseDailyRate();

    // Show slashed price if current per day rate is lower than base rate
    // and we're not dealing with adventure items (they don't have discounts)
    if (isAdventureItem()) {
      return false;
    }

    return currentPerDay < baseDailyRate;
  };

  // Tiered pricing function
  const calculateTieredPrice = (duration) => {
    let baseTotal, perDay, tier;

    // Adventure items have special week/month pricing based on per day price
    if (isAdventureItem()) {
      if (duration === 1) {
        baseTotal = price;
        perDay = price;
        tier = "adventure-single-day";
      } else if (duration === 2) {
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-two-days";
      } else if (duration >= 3 && duration <= 6) {
        // Short-term adventure rental
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-short-term";
      } else if (duration === 7) {
        // Week pricing for adventure items - full daily rate
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-week";
      } else if (duration >= 8 && duration <= 29) {
        // Extended adventure rental - use daily rate
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-extended";
      } else if (duration >= 30) {
        // Monthly pricing for adventure items - full daily rate
        baseTotal = duration * price;
        perDay = price;
        tier = "adventure-month";
      } else {
        return { total: 0, perDay: 0, tier: "invalid", discount: 0 };
      }
    } else {
      // Check if this is PS5 + Gaming Wheel combo
      const isPS5Combo =
        productName &&
        productName.toLowerCase().includes("ps5") &&
        productName.toLowerCase().includes("gaming wheel");
      const isPS5 =
        productName && productName.toLowerCase().includes("ps5") && !isPS5Combo;

      if (isPS5Combo) {
        // Special pricing for PS5 + Gaming Wheel combo
        if (duration === 1) {
          baseTotal = 1499;
          perDay = 1499;
          tier = "ps5-combo-single-day";
        } else if (duration === 2) {
          baseTotal = 2999;
          perDay = Math.round(2999 / 2);
          tier = "ps5-combo-weekend";
        } else if (duration === 7) {
          baseTotal = 3999;
          perDay = Math.round(3999 / 7);
          tier = "ps5-combo-week";
        } else if (duration === 30) {
          baseTotal = 7999;
          perDay = Math.round(7999 / 30);
          tier = "ps5-combo-month";
        } else if (duration > 20) {
          // For durations more than 20 days, use 399/day
          baseTotal = duration * 399;
          perDay = 399;
          tier = "ps5-combo-long-term";
        } else if (duration >= 3 && duration <= 7) {
          // Special fixed pricing for PS5 combo 3-7 days
          baseTotal = 3499;
          perDay = Math.round(3499 / duration);
          tier = "ps5-combo-3-7-days-special";
        } else {
          // For other durations (8-20 days), use daily rate of 499
          baseTotal = duration * 499;
          perDay = 499;
          tier = "ps5-combo-custom";
        }
      } else {
        // Regular pricing for non-adventure items
        if (duration === 1) {
          baseTotal = 1000;
          perDay = 1000;
          tier = "single-day";
        } else if (duration === 2) {
          baseTotal = 2000;
          perDay = 1000;
          tier = "two-days";
        } else if (duration >= 3 && duration <= 7) {
          // Special pricing for PS5
          if (isPS5) {
            if (duration >= 3 && duration <= 5) {
              // PS5 3-5 days special pricing
              baseTotal = 2499;
              perDay = Math.round(2499 / duration);
              tier = "ps5-3-5-days-special";
            } else if (duration === 7) {
              // PS5 week plan
              baseTotal = 2499;
              perDay = Math.round(2499 / 7);
              tier = "ps5-week-special";
            } else {
              // PS5 6 days - use regular short-term rate
              baseTotal = duration * 500;
              perDay = 500;
              tier = "short-term";
            }
          } else {
            baseTotal = duration * 500;
            perDay = 500;
            tier = "short-term";
          }
        } else if (duration >= 8 && duration <= 10) {
          // Special pricing for PS5 8-10 days
          if (isPS5) {
            baseTotal = 2999;
            perDay = Math.round(2999 / duration);
            tier = "ps5-8-10-days-special";
          } else {
            baseTotal = duration * price;
            perDay = price;
            tier = "medium-term";
          }
        } else if (duration >= 11 && duration <= 12) {
          baseTotal = duration * price;
          perDay = price;
          tier = "medium-term";
        } else if (duration >= 13 && duration <= 29) {
          baseTotal = duration * 249;
          perDay = 249;
          tier = "extended-term";
        } else if (duration >= 30) {
          baseTotal = duration * price;
          perDay = price;
          tier = "long-term";
        } else {
          return { total: 0, perDay: 0, tier: "invalid", discount: 0 };
        }
      }
    }

    // Apply discounts
    let discount = 0;

    // Adventure items don't have discounts - use full daily rate
    if (isAdventureItem()) {
      // No discounts for adventure items
      discount = 0;
    } else {
      // Check if this is PS5 + Gaming Wheel combo
      const isPS5Combo =
        productName &&
        productName.toLowerCase().includes("ps5") &&
        productName.toLowerCase().includes("gaming wheel");
      const isPS5 =
        productName && productName.toLowerCase().includes("ps5") && !isPS5Combo;

      if (isPS5Combo) {
        // Calculate discount for PS5 combo based on daily rate (499/day)
        const dailyRate = 499;
        const standardPrice = duration * dailyRate;

        // Only show discount if the plan is actually cheaper than standard rate
        // Don't show discount for single day (₹1,499) or weekend (₹2,999) as they're premium pricing
        if (baseTotal < standardPrice && duration >= 7) {
          discount = Math.round(
            ((standardPrice - baseTotal) / standardPrice) * 100
          );
        }
      } else {
        // Apply discounts for exactly 30 days for non-adventure items
        if (duration === DEFAULT_RENTAL_DAYS) {
          if (isPS5) {
            // Fixed price for PS5 monthly rentals (calculated discount based on daily rate)
            const dailyRate = 299;
            const monthlyAtDailyRate = dailyRate * 30; // 8970
            baseTotal = 5249;
            discount = Math.round(
              ((monthlyAtDailyRate - baseTotal) / monthlyAtDailyRate) * 100
            ); // 41% discount
            tier = "30-day-ps5-special";
          } else {
            // Apply 25% discount for other products monthly rentals
            discount = 25;
            baseTotal = baseTotal * 0.75;
            tier = "30-day-special";
          }
        }
      }
    }

    // Convert to xx9 format
    const finalTotal = convertToXX9Format(baseTotal);

    return {
      total: finalTotal,
      perDay: Math.round(finalTotal / duration),
      tier,
      discount: discount, // Already in percentage format
    };
  };

  // Get pricing tier info for display
  const getPricingTierInfo = (duration) => {
    const isPS5Combo =
      productName &&
      productName.toLowerCase().includes("ps5") &&
      productName.toLowerCase().includes("gaming wheel");
    const isPS5 =
      productName && productName.toLowerCase().includes("ps5") && !isPS5Combo;
    const isAdventure = isAdventureItem();

    if (isAdventure) {
      if (duration === 1) {
        return `Adventure daily rate (₹${price}/day)`;
      } else if (duration === 2) {
        return `Adventure rate (₹${price}/day)`;
      } else if (duration >= 3 && duration <= 6) {
        return `Adventure short-term (₹${price}/day)`;
      } else if (duration === 7) {
        return `Adventure weekly rate (₹${price}/day)`;
      } else if (duration >= 8 && duration <= 29) {
        return `Adventure extended rate (₹${price}/day)`;
      } else if (duration >= 30) {
        return `Adventure monthly rate (₹${price}/day)`;
      }
    } else if (isPS5Combo) {
      // PS5 + Gaming Wheel combo pricing info
      const pricing = calculateTieredPrice(duration);
      if (duration === 1) {
        return `Single day special (${
          pricing.discount > 0
            ? pricing.discount + "% discount!"
            : "special rate"
        })`;
      } else if (duration === 2) {
        return `Weekend special (${
          pricing.discount > 0
            ? pricing.discount + "% discount!"
            : "special rate"
        })`;
      } else if (duration === 7) {
        return `Week special (${
          pricing.discount > 0
            ? pricing.discount + "% discount!"
            : "special rate"
        })`;
      } else if (duration === 30) {
        return `Month special (${
          pricing.discount > 0
            ? pricing.discount + "% discount!"
            : "special rate"
        })`;
      } else if (duration >= 3 && duration <= 7) {
        return `PS5 Combo 3-7 Days Special (₹3499 total)`;
      } else if (duration >= 8 && duration <= 20) {
        return `Extended rate (₹499/day)`;
      } else if (duration > 20 && duration < 30) {
        return `Long-term rate (₹399/day)`;
      } else if (duration > 30) {
        return `Long-term rate (₹399/day)`;
      }
    } else {
      if (duration === 1) {
        return "Single day rate";
      } else if (duration === 2) {
        return "Two day rate (₹1000/day)";
      } else if (duration >= 3 && duration <= 7) {
        if (isPS5) {
          if (duration >= 3 && duration <= 5) {
            return "PS5 3-5 Days Special (₹2499 total)";
          } else if (duration === 7) {
            return "PS5 Week Special (₹2499 total)";
          } else {
            return "Short-term rate (₹500/day)";
          }
        }
        return "Short-term rate (₹500/day)";
      } else if (duration >= 8 && duration <= 10) {
        return isPS5
          ? "PS5 8-10 Days Special (₹2999 total)"
          : "Medium-term rate (8-10 days)";
      } else if (duration >= 11 && duration <= 12) {
        return "Medium-term rate (11-12 days)";
      } else if (duration >= 13 && duration <= 29) {
        return "Extended rate (₹249/day)";
      } else if (duration === DEFAULT_RENTAL_DAYS) {
        return isPS5
          ? "30-day special (41% discount!)"
          : "30-day special (25% discount!)";
      } else if (duration >= 31) {
        return "Long-term rate (31+ days)";
      }
    }
    return "";
  };

  // Reset dates and plan when popup opens or product changes
  useEffect(() => {
    if (isOpen) {
      // Always reset to single day plan when popup opens
      setSelectedPlan("single");

      const today = new Date();
      setStartDate(today);

      // Set default end date to 1 day from start date
      const defaultEndDate = new Date(today);
      defaultEndDate.setDate(today.getDate() + RENTAL_PLANS["single"].days);
      setEndDate(defaultEndDate);
    }
  }, [isOpen, productName]);

  // Handle plan selection
  const handlePlanSelection = (planKey) => {
    setSelectedPlan(planKey);

    // Update end date based on selected plan
    if (startDate) {
      const planDays = RENTAL_PLANS[planKey].days;
      // Ensure we don't exceed 30 days maximum
      const daysToAdd = Math.min(planDays, 30);
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + daysToAdd);
      setEndDate(newEndDate);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);

    // Update end date based on selected plan and new start date
    const planDays = RENTAL_PLANS[selectedPlan].days;
    // Ensure we don't exceed 30 days maximum
    const daysToAdd = Math.min(planDays, 30);
    const newEndDate = new Date(date);
    newEndDate.setDate(date.getDate() + daysToAdd);
    setEndDate(newEndDate);
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const pricing = calculateTieredPrice(duration);
      onConfirm(startDate, endDate, duration, pricing);
    }
  };

  // Handle click outside to close popup
  const handleOverlayClick = (e) => {
    // Only close if clicking directly on the overlay, not on the popup content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const duration =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;

  const pricing =
    duration > 0
      ? calculateTieredPrice(duration)
      : { total: 0, perDay: 0, tier: "invalid" };

  return (
    <div className="calendar-overlay" onClick={handleOverlayClick}>
      <div className="calendar-popup">
        <div className="calendar-header">
          <div>
            <h3>Select Rental Duration</h3>
            {productName && (
              <div className="selected-product">
                Renting: <b>{productName}</b>
              </div>
            )}
            <div className="rental-plans">
              {Object.entries(RENTAL_PLANS).map(([key, plan]) => (
                <button
                  key={key}
                  className={`plan-chip ${
                    selectedPlan === key ? "selected" : ""
                  }`}
                  onClick={() => handlePlanSelection(key)}
                >
                  {plan.label}
                </button>
              ))}
            </div>
          </div>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="calendar-content">
          <div className="date-range">
            <div className="date-picker-group">
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
              />
            </div>
            <div className="date-picker-group">
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={
                  startDate
                    ? new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000)
                    : null
                }
                dateFormat="dd/MM/yyyy"
              />
            </div>
          </div>
          <div className="rental-summary">
            <p>
              Duration: <b>{duration}</b> {duration === 1 ? "day" : "days"}
            </p>
            {duration > 0 && (
              <p className="pricing-tier">
                <small
                  className={
                    duration === DEFAULT_RENTAL_DAYS ? "special-discount" : ""
                  }
                >
                  {getPricingTierInfo(duration)}
                </small>
              </p>
            )}
            {pricing.discount > 0 && (
              <p className="discount-info">
                <small style={{ color: "green" }}>
                  🎉 {pricing.discount}% discount applied!
                </small>
              </p>
            )}
            <p className="total-price">
              Total Price: <span>₹{formatPrice(pricing.total)}</span>
            </p>
            {duration > 0 && (
              <p className="per-unit">
                {shouldShowSlashedPrice(duration, pricing.perDay) ? (
                  <span className="slashed-pricing">
                    <span className="original-price">
                      ₹{formatPrice(getBaseDailyRate())}
                    </span>
                    <span className="discounted-price">
                      ₹{formatPrice(pricing.perDay)}
                    </span>
                    <span className="per-day-text">per day</span>
                  </span>
                ) : (
                  <span className="regular-pricing">
                    <span className="current-price">
                      ₹{formatPrice(pricing.perDay)}
                    </span>
                    <span className="per-day-text">per day</span>
                  </span>
                )}
              </p>
            )}
          </div>
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={!startDate || !endDate || duration <= 0}
          >
            Confirm Rental
          </button>
        </div>
      </div>
    </div>
  );
};

export default RentalCalendar;
