import React from "react";

const ResultAlert = (props) => {
  // Wouldn't send the full parent state to child component
  // was not being returned if result was 0
  if (typeof props.result === "number") {
    return <h1>Result: {props.result}</h1>;
  }
  return null;
};

export default ResultAlert;
