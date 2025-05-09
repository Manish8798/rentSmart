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

  // Reset dates when popup opens or product changes
  useEffect(() => {
    if (isOpen) {
      setStartDate(new Date());
      setEndDate(null);
    }
  }, [isOpen, productName]);

  const handleConfirm = () => {
    if (startDate && endDate) {
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      onConfirm(startDate, endDate, duration);
    }
  };

  if (!isOpen) return null;

  const duration =
    startDate && endDate
      ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      : 0;
  const total = duration > 0 ? price * duration : 0;

  return (
    <div className="calendar-overlay">
      <div className="calendar-popup">
        <div className="calendar-header">
          <div>
            <h3>Select Rental Duration</h3>
            {productName && (
              <div className="selected-product">
                Renting: <b>{productName}</b>
              </div>
            )}
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
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
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
              />
            </div>
          </div>
          <div className="rental-summary">
            <p>
              Duration: <b>{duration}</b> {duration === 1 ? "day" : "days"}
            </p>
            <p className="total-price">
              Total Price: <span>₹{total}</span>
            </p>
            {price && priceUnit && (
              <p className="per-unit">
                ({price} per {priceUnit})
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
