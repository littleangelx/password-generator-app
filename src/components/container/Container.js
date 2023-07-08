import React, { useState, useEffect, useMemo } from "react";
import Button from "./button/Button";
import Slider from "./slider/Slider";
import CheckBox from "./checkbox/CheckBox";
import Strength from "./password-strength/Strength";
import {
  generatePassword,
  passwordLength,
  setPasswordLength,
  copyToClipboard,
} from "../../utils/Helper";

const CHECKBOX_LIST = [
  {
    id: 0,
    name: "uppercase",
    label: "Include Uppercase Letters",
    isChecked: true,
  },
  {
    id: 1,
    name: "lowercase",
    label: "Include Lowercase Letters",
    isChecked: true,
  },
  {
    id: 2,
    name: "numbers",
    label: "Include Numbers",
    isChecked: true,
  },
  {
    id: 3,
    name: "symbols",
    label: "Include Symbols",
    isChecked: true,
  },
];

const Container = (props) => {
  const {
    password,
    setPassword,
    setRange,
    setPasswordProps,
    passwordRef,
    generateNewPassword,
  } = props;

  const [rangeValue, setRangeValue] = useState(12);
  const [checkbox, setCheckBox] = useState({
    uppercase: true,
    lowercase: true,
    symbols: true,
    numbers: true,
  });

  const [checked, setChecked] = useState(false);
  const [checkedName, setCheckedName] = useState("");
  const [minMaxValue, setMinMaxValue] = useState({
    min: 1,
    max: 20,
  });

  const { uppercase, lowercase, symbols, numbers } = checkbox;
  const { min, max } = minMaxValue;

  let barNumber = 0;

  useEffect(() => {
    setPasswordLength(rangeValue);
    setRange(rangeValue);
    setRangeValue(rangeValue);
    passwordGenerated(checkbox, rangeValue);

    checkBoxCount();

    // eslint-disable-next-line
  }, [uppercase, lowercase, symbols, numbers]);

  const checkBoxCount = () => {
    const checkedCount = Object.keys(checkbox).filter((key) => checkbox[key]);
    const disabled = checkedCount.length === 1;
    const name = checkedCount[0];
    if (disabled) {
      setChecked(disabled);
      setCheckedName(name);
    } else {
      setChecked(false);
      setCheckedName("");
    }
  };

  const updateCheckBoxes = () => {
    CHECKBOX_LIST.map((checkbox) => {
      const name = checkbox.name;
      checkbox.isChecked = true;
      const checkboxProps = {
        name,
        checkedName: "",
        checked: false,
        isChecked: checkbox.isChecked,
        min: 1,
        max: 60,
        length: 12,
      };
      checkBoxProperties(checkboxProps);
      return "";
    });
  };

  const checkBoxProperties = (checkboxProps) => {
    const { name, checked, isChecked, checkedName, min, max, length } =
      checkboxProps;

    setCheckBox((prevState) => ({ ...prevState, [name]: isChecked }));
    setChecked(checked);
    setCheckedName(checkedName);
    setPasswordLength(length);
    setMinMaxValue({ min, max });
    setRange(length);
  };

  const passwordGenerated = (checkbox, rangeValue) => {
    const pwd = generatePassword(checkbox, rangeValue);
    setPassword(pwd);
    setPasswordProps(checkbox);
  };

  const onChangeSlider = (e) => {
    setPasswordLength(e.target.value);
    setRangeValue(e.target.value);
    setRange(e.target.value);
    passwordGenerated(checkbox, e.target.value);
  };

  const onChangeCheckBox = (e) => {
    let { name, checked } = e.target;
    CHECKBOX_LIST.map((checkbox) => {
      if (checkbox.name === name) {
        checkbox.isChecked = checked;
        setCheckBox((prevState) => ({
          ...prevState,
          [name]: checkbox.isChecked,
        }));
        setPasswordLength(rangeValue);
        setRangeValue(rangeValue);
      }

      return "";
    });
  };

  const copyClipboard = (elementRef) => (e) => {
    e.preventDefault();
    copyToClipboard(elementRef);
  };

  return (
    <div className="password-setup">
      <Slider
        step={1}
        min={parseInt(min, 10)}
        max={parseInt(max, 10)}
        defaultLength={parseInt(rangeValue, 10)}
        value={parseInt(rangeValue, 10)}
        onChangeValue={onChangeSlider}
      />
      <div className="rules-section">
        {CHECKBOX_LIST.map((checkbox) => (
          <CheckBox
            key={checkbox.id}
            name={checkbox.name}
            checked={checkbox.isChecked}
            label={checkbox.label}
            value={checkbox.isChecked}
            onChange={onChangeCheckBox}
            disabled={
              checked && checkbox.isChecked && checkedName === checkbox.name
            }
          />
        ))}
      </div>
      <Strength password={password} />
      <Button generateNewPassword={generateNewPassword} />
    </div>
  );
};

export default Container;

// <div className="password-setup">
//   <Slider
//     min={parseInt(min, 10)}
//     max={parseInt(max, 10)}
//     step={1}
//     defaultLength={parseInt(rangeValue, 10)}
//     value={parseInt(rangeValue, 10)}
//     onChangeValue={onChangeSlider}
//   />

//   <Strength />
//   <Button>Generate</Button>
// </div>

//

//           <div className="col-md-12">
//             <div className="row checkbox-container">
//               {CHECKBOX_LIST.map((checkbox) => (
//                 <CheckBox
//                   key={checkbox.id}
//                   name={checkbox.name}
//                   checked={checkbox.isChecked}
//                   label={checkbox.label}
//                   value={checkBoxCount.isChecked}
//                   onChange={onChangeCheckBox}
//                   disabled={
//                     checked &&
//                     checkbox.isChecked &&
//                     checkedName === checkbox.name
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <br />

//         <div className="text-center">
//           <div className="row">
//             <div className="col-md-12">
//               <Button
//                 className="btn password-btn"
//                 label="Copy Password"
//                 handleClick={copyClipboard(passwordRef.current)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };
// };

// export { Container };
