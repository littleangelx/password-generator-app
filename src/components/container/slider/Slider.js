import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import "./Slider.css";

const Slider = (props) => {
  const { step, min, max, value, defaultLength, onChangeValue } = props;

  const rangeRef = useRef();
  let [range, setRange] = useState();

  const activeRangeColor = " #A4FFAF";
  const rangeBackground = "#18171F";

  const handleChange = (max) => (e) => {
    onChangeValue(e);
    const value = e.target.value;
    setRange(value);
    const progress = (value / max) * 100 + "%";
    const newBackgroundStyle = `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`;
    rangeRef.current.style.background = newBackgroundStyle;
  };

  if (range !== defaultLength || !range) {
    range = defaultLength;
  }

  const progressValue = range;
  const progress = (progressValue / max) * 100 + "%";
  const styleInput = {
    background: `linear-gradient(90deg, ${activeRangeColor} 0% ${progress}, ${rangeBackground} ${progress} 100%)`,
  };

  return (
    <div className="char-section">
      <p className="char-text">
        Character Length
        <span className="char-value">{progressValue}</span>
      </p>

      <input
        ref={rangeRef}
        className="range-slider"
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={handleChange(max)}
        style={styleInput}
      />
    </div>
  );
};

Slider.propTypes = {
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  defaultLength: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
};

export default Slider;
