import { useState } from "react";
import Input from "../ui-kit/input/Input";
import Button from "../ui-kit/button/Button";

import "./InputComponent.styles.scss";

interface CustomInputProps {
  text: string;
  onSubmit: (value: string) => void;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
}

function CustomInput(props: CustomInputProps) {
  const {
    text,
    onSubmit,
    displayClass,
    editClass,
    placeholder,
    defaultValue,
    buttonText,
  } = props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e: any) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit(inputText);
    }
    setIsCustomInput(false);
  };

  return (
    <div className="custom-input">
      {isCustomInput ? (
        <form
          className={`custom-input-edit ${editClass ? editClass : ""}`}
          onSubmit={submission}
        >
          <Input
            type="text"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="custom-input-edit-footer">
            <Button type={"submit"}>{buttonText || "Add"}</Button>
            <Button color="danger" onClick={() => setIsCustomInput(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsCustomInput(true)}
        >
          {text}
        </div>
      )}
    </div>
  );
}

export default CustomInput;
