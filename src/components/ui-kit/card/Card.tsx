import { FC, ReactNode } from "react";
import "./Card.styles.scss";

interface Props {
  children: ReactNode | ReactNode[];
  className?: string;
}

const Card: FC<Props> = ({ children, className }) => {
  return <div className={"card " + className}>{children}</div>;
};

export default Card;
