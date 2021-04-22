import React from "react";

const ResultAlert = ({ result }) => {
  if (typeof result === "number") {
    return (
      <h4 className="mt-3">
        Result: <strong>{result}</strong>
      </h4>
    );
  }

  return null;
};

// could use prop types

export default ResultAlert;
