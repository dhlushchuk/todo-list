import { ChangeEvent, FC } from "react";
import "./Input.styles.scss";

interface Props {
  type: string;
  value: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

const Input: FC<Props> = (props) => {
  return <input className="input" {...props} />;
};

export default Input;
