import { FC, ReactNode, MouseEvent } from "react";
import "./Button.styles.scss";

interface Props {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const RoundButton: FC<Props> = ({ children, onClick }) => {
  return (
    <button type="button" onClick={onClick} className="round-button">
      {children}
    </button>
  );
};

export default RoundButton;
