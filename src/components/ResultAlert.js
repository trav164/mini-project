import React from "react";

const ResultAlert = (props) => {
  // Wouldn't send the full parent state to child component
  if (props.result) {
    return <h1>Result: {props.result}</h1>;
  }
  return null;
};

export default ResultAlert;
