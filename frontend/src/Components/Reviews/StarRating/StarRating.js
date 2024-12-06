import React from "react";
import "./StarRating.css";

function StarRating({ value, onChange }) {

  // Generate 5 star icons based on the value (number of filled stars)
  const stars = [1, 2, 3, 4, 5].map((starValue) => (
    
    <span
      key={starValue}
      className={starValue <= value ? "star-filled" : "star"}
      onClick={() => onChange(starValue)}
    >
      &#9733;
    </span>
  ));

  return <div>{stars}</div>;
}

export default StarRating;
