import React from "react";

const DateComponent = ({ date, onChange }) => {
  let formattedDate = "";
  try {
    formattedDate = new Date(date).toISOString().substring(0, 10);
  } catch (error) {
    console.error("Invalid date:", date);
  }

  return (
    <div className="date-container">
      <label>Date: </label>
      <input
        type="date"
        value={formattedDate}
        onChange={(e) => onChange(e.target.value)}
        className="date-input"
      />
    </div>
  );
};

export default DateComponent;
