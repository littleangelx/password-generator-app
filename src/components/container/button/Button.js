import React from "react";

const Button = ({ generateNewPassword }) => {
  return (
    <button onClick={generateNewPassword}>
      Generate
      <span>
        <img src="icon-arrow-right.svg" alt="Right arrow"></img>
      </span>
    </button>
  );
};

export default Button;
