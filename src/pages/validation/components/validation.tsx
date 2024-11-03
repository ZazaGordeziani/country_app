import { ChangeEvent, KeyboardEvent, useRef, useState, FC } from "react";
import styles from "./validation.module.css";

interface InputRefs {
  [key: number]: HTMLInputElement | null;
}

interface ValidationProps {
  count: number; // Prop to determine how many inputs will be displayed
}

// count deteremines how many inputs will be displayed
const Validation: FC<ValidationProps> = ({ count }) => {
  const initialInputs = Array.from({ length: count }, (_, index) => ({
    id: `input${index + 1}`,
    value: "",
  }));

  const [inputs, setInputs] = useState(initialInputs);
  const inputRefs = useRef<InputRefs>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    // Only one number can be inserted in the input
    if (/^\d?$/.test(value)) {
      const newInputs = [...inputs];
      newInputs[index].value = value; // update input value
      setInputs(newInputs); // Update the state when inputs are inserted(only numbers)

      // move focuse if the value is filled
      if (value) {
        // if the input's index is not the last, move focus to the next input
        if (index < count - 1) {
          inputRefs.current[index + 1]?.focus();
        }
        // in case of the last input, clear the focus.
        if (index === count - 1) {
          inputRefs.current[index]?.blur();
        }
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const currentInputValue = inputs[index].value;

      // Clear the current input value if not empty
      if (currentInputValue !== "") {
        const newInputs = [...inputs]; // Create a copy to update state
        newInputs[index].value = ""; // Clear the current input
        setInputs(newInputs); // Update the state
      }

      // Move focus to the previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }

      // Prevent the default backspace behavior to avoid navigating back in the browser
      e.preventDefault();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text"); // retrieve copied numbers
    const digits = pastedData.split("").filter((digit) => /^\d$/.test(digit)); // numbers are splitted in order to paste them separately in the inputs

    const newInputs = [...inputs]; //shallow copy of inputs is created, so the original array will not be changed.

    for (let i = 0; i < digits.length && index + i < count; i++) {
      newInputs[index + i].value = digits[i];
    } //for loop helps to assign the values accordingly to the inputs

    setInputs(newInputs); // new values added to setInputs and then state updates
  };

  return (
    <div className={styles.form}>
      {inputs.map((input, index) => (
        <input
          ref={(inputElementReference) => {
            inputRefs.current[index] = inputElementReference;
          }}
          key={input.id}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className={styles.boxes}
          value={input.value}
        />
      ))}
    </div>
  );
};

export default Validation;
