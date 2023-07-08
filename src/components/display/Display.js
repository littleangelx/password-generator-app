import React, { useState, useRef } from "react";
import Container from "../container/Container";
import { generatePassword, copyToClipboard } from "../../utils/Helper";

const Display = () => {
  const [password, setPassword] = useState("");
  const [rangeValue, setRange] = useState();
  const [passwordProps, setPasswordProps] = useState();
  const passwordRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const generateNewPassword = () => {
    const pwd = generatePassword(passwordProps, rangeValue);
    setPassword(pwd);
    setCopied(false);
  };

  const copyClipboard = (e) => {
    e.preventDefault();
    copyToClipboard(passwordRef.current);
    setCopied(true);
  };

  return (
    <div className="password-section">
      <div className="password">
        <input ref={passwordRef} type="text" value={password} readOnly />
        <div className="copied">
          {copied ? (
            <span style={{ visibility: "visible" }}>Copied</span>
          ) : (
            <span style={{ visibility: "hidden" }}>Copied</span>
          )}
          <img
            src="icon-copy.svg"
            alt="copy"
            className="copy"
            onClick={copyClipboard}
          />
        </div>
      </div>

      <Container
        password={password}
        setPassword={setPassword}
        setRange={setRange}
        setPasswordProps={setPasswordProps}
        passwordRef={passwordRef}
        generateNewPassword={generateNewPassword}
      />
    </div>
  );
};

const selectTagStyle = {
  backgroundColor: "inherit",
  color: "#506175",
  width: "20%",
  height: "auto",
  marginLeft: "-4px",
};

export default Display;
