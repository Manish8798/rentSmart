import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalCalendar = ({
  isOpen,
  onClose,
  onConfirm,
  productName,
  price,
  priceUnit,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  // Default rental duration in days (1 month = 30 days)
  const DEFAULT_RENTAL_DAYS = 30;

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

  // Tiered pricing function
  const calculateTieredPrice = (duration) => {
    let baseTotal, perDay, tier;

    if (duration === 1) {
      baseTotal = 1000;
      perDay = 1000;
      tier = "single-day";
    } else if (duration === 2) {
      baseTotal = 2000;
      perDay = 1000;
      tier = "two-days";
    } else if (duration >= 3) {
      baseTotal = duration * 249;
      perDay = 249;
      tier = "long-term";
    } else {
      return { total: 0, perDay: 0, tier: "invalid", discount: 0 };
    }

    // Apply 25% discount for exactly 30 days
    let discount = 0;
    if (duration === DEFAULT_RENTAL_DAYS) {
      discount = 0.25;
      baseTotal = baseTotal * (1 - discount);
      tier = "30-day-special";
    }

    // Convert to xx9 format
    const finalTotal = convertToXX9Format(baseTotal);

    return {
      total: finalTotal,
      perDay: Math.round(finalTotal / duration),
      tier,
      discount: discount * 100, // Convert to percentage for display
    };
  };

  // Get pricing tier info for display
  const getPricingTierInfo = (duration) => {
    if (duration === 1) {
      return "Single day rate";
    } else if (duration === 2) {
      return "Two day rate (₹1000/day)";
    } else if (duration === DEFAULT_RENTAL_DAYS) {
      return "30-day special (25% discount applied!)";
    } else if (duration >= 3) {
      return "Long-term rate (3+ days)";
    }
    return "";
  };

  // Reset dates when popup opens or product changes
  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      setStartDate(today);

      // Set default end date to 1 month from start date
      const defaultEndDate = new Date(today);
      defaultEndDate.setDate(today.getDate() + DEFAULT_RENTAL_DAYS);
      setEndDate(defaultEndDate);
    }
  }, [isOpen, productName]);

  const handleStartDateChange = (date) => {
    setStartDate(date);

    // If there's an end date and it's before the new start date, clear it
    if (endDate && endDate <= date) {
      setEndDate(null);
    }
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
            <div className="minimum-tenure-notice">
              <small>Default: 1 month (customizable)</small>
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
