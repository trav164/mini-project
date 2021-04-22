import React from "react";

const ResultAlert = (props) => {
  // Wouldn't send the full parent state to child component
  if (typeof props.result === "number") {
    return (
      <h4 className="mt-3">
        Result: <strong>{props.result}</strong>
      </h4>
    );
  }

  return null;
};

export default ResultAlert;
