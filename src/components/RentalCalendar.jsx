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
  const [selectedPlan, setSelectedPlan] = useState("month");

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

  // Check if product is an adventure item
  const isAdventureItem = () => {
    return productCategory === "Adventure";
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
        // Special pricing for PS5 week plan
        if (
          duration === 7 &&
          productName &&
          productName.toLowerCase().includes("ps5")
        ) {
          baseTotal = 2499;
          perDay = Math.round(2499 / 7);
          tier = "ps5-week-special";
        } else {
          baseTotal = duration * 500;
          perDay = 500;
          tier = "short-term";
        }
      } else if (duration >= 8 && duration <= 12) {
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

    // Apply discounts
    let discount = 0;

    // Adventure items don't have discounts - use full daily rate
    if (isAdventureItem()) {
      // No discounts for adventure items
      discount = 0;
    } else {
      // Apply discounts for exactly 30 days for non-adventure items
      if (duration === DEFAULT_RENTAL_DAYS) {
        if (productName && productName.toLowerCase().includes("ps5")) {
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
    const isPS5 = productName && productName.toLowerCase().includes("ps5");
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
    } else {
      if (duration === 1) {
        return "Single day rate";
      } else if (duration === 2) {
        return "Two day rate (₹1000/day)";
      } else if (duration >= 3 && duration <= 7) {
        if (duration === 7 && isPS5) {
          return "PS5 Week Special (₹2499 total)";
        }
        return "Short-term rate (₹500/day)";
      } else if (duration >= 8 && duration <= 12) {
        return "Medium-term rate (8-12 days)";
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
      // Always reset to month plan when popup opens
      setSelectedPlan("month");

      const today = new Date();
      setStartDate(today);

      // Set default end date to 1 month (30 days) from start date
      const defaultEndDate = new Date(today);
      defaultEndDate.setDate(today.getDate() + RENTAL_PLANS["month"].days);
      setEndDate(defaultEndDate);
    }
  }, [isOpen, productName]);

  // Handle plan selection
  const handlePlanSelection = (planKey) => {
    setSelectedPlan(planKey);

    // Update end date based on selected plan
    if (startDate) {
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + RENTAL_PLANS[planKey].days);
      setEndDate(newEndDate);
    }
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);

    // Update end date based on selected plan and new start date
    const newEndDate = new Date(date);
    newEndDate.setDate(date.getDate() + RENTAL_PLANS[selectedPlan].days);
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
              Total Price: <span>₹{pricing.total}</span>
            </p>
            {duration > 0 && (
              <p className="per-unit">(₹{pricing.perDay} per day)</p>
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
