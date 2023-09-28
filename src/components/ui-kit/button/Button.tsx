import { FC, ReactNode } from "react";
import "./Button.styles.scss";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  color?: "primary" | "danger";
}

const Button: FC<Props> = ({
  children,
  onClick = () => {},
  disabled = false,
  type = "button",
  color = "primary",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        color === "primary" ? "button button-primary" : "button button-danger"
      }
    >
      {children}
    </button>
  );
};

export default Button;
