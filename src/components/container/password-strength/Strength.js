import React, { useState } from "react";

export default function Strength({ password }) {
  let pwdDescription;

  const passwordStrength = (password) => {
    if (password && password.length <= 5) {
      return 1;
    } else if (password && password.length > 5 && password.length <= 10) {
      return 2;
    } else if (password && password.length > 10 && password.length <= 14) {
      return 3;
    } else if (password && password.length >= 15) {
      return 4;
    } else {
      return 0;
    }
  };

  const passwordColor = (barNumber) => {
    if (barNumber === 1) {
      pwdDescription = "Too Weak!";
      return "#F64A4A";
    } else if (barNumber === 2) {
      pwdDescription = "Weak";
      return "#FB7C58";
    } else if (barNumber === 3) {
      pwdDescription = "Good";
      return "#F8CD65";
    } else if (barNumber === 4) {
      pwdDescription = "Strong";
      return "#A4FFAF";
    } else {
      pwdDescription = "Too Weak!";
      return "#f64a4a";
    }
  };

  const passwordDescription = (barNumber) => {
    if (barNumber === 1) {
      return "Too Weak!";
    } else if (barNumber === 2) {
      return "Weak";
    } else if (barNumber === 3) {
      return "Good";
    } else if (barNumber === 4) {
      return "Strong";
    } else {
      return "Too Weak!";
    }
  };

  return (
    <div className="strength">
      <p>Strength</p>
      <div className="strength-section">
        <span className="password-strength">
          {passwordDescription(passwordStrength(password))}
        </span>
        <div className="strength-bars">
          <div
            style={
              passwordStrength(password) >= 1
                ? { backgroundColor: passwordColor(passwordStrength(password)) }
                : {}
            }
            className="strength-bar"
          ></div>
          <div
            style={
              passwordStrength(password) >= 2
                ? { backgroundColor: passwordColor(passwordStrength(password)) }
                : {}
            }
            className="strength-bar"
          ></div>
          <div
            style={
              passwordStrength(password) >= 3
                ? { backgroundColor: passwordColor(passwordStrength(password)) }
                : {}
            }
            className="strength-bar"
          ></div>
          <div
            style={
              passwordStrength(password) >= 4
                ? { backgroundColor: passwordColor(passwordStrength(password)) }
                : {}
            }
            className="strength-bar"
          ></div>
        </div>
      </div>
    </div>
  );
}
