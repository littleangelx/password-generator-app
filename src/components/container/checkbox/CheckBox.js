import React from "react";
import PropTypes from "prop-types";

const CheckBox = (props) => {
  const { label, value, checked, name, onChange, disabled } = props;

  return (
    <label className="main">
      {label}
      <input
        type="checkbox"
        name={name}
        checked={checked}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="checkbox"
        id="checkbox"
      />
      <span className="custom-checkbox"></span>
    </label>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
