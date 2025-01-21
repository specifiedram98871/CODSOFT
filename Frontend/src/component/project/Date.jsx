import React from "react";
import CreateProject from "./CreateProject";

const DateComponent = ({ date, onChange }) => {
  let formattedDate = "";
  try {
    formattedDate = new Date(date).toISOString().substring(0, 10);
  } catch (error) {
    // console.error("Invalid date:", date);
    formattedDate = ""; // Set a default value if the date is invalid
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
