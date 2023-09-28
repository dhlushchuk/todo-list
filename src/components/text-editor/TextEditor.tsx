import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Button from "../ui-kit/button/Button";

interface CustomInputProps {
  text: string;
  onSubmit: (value: string) => void;
  displayClass?: string;
  editClass?: string;
  placeholder?: string;
  defaultValue?: string;
  buttonText?: string;
}

const TextEditor = (props: CustomInputProps) => {
  const { text, onSubmit, displayClass, editClass, defaultValue, buttonText } =
    props;
  const [isCustomInput, setIsCustomInput] = useState(false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e: any) => {
    e.preventDefault();
    if (inputText && onSubmit) {
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
          <Editor
            value={inputText}
            onEditorChange={(value) => setInputText(value)}
            init={{
              height: 200,
              menubar: false,
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          <div className="custom-input-edit-footer">
            <Button type="submit">{buttonText || "Add"}</Button>
            <Button color="danger" onClick={() => setIsCustomInput(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={`custom-input-display ${displayClass ? displayClass : ""}`}
          onClick={() => setIsCustomInput(true)}
          dangerouslySetInnerHTML={{
            __html: text,
          }}
        ></div>
      )}
    </div>
  );
};

export default TextEditor;
