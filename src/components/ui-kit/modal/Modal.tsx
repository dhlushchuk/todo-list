import { FC, ReactNode } from "react";
import RoundButton from "../button/RoundButton";

import "./Modal.styles.scss";

interface Props {
  isShow: boolean;
  close: () => void;
  children: ReactNode;
}

const Modal: FC<Props> = ({ isShow, close, children }) => {
  if (isShow)
    return (
      <div className="modal" onClick={close}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <div className="modal-card-header">
            <div className="modal-card-header-button-wrapper">
              <RoundButton onClick={close}>&times;</RoundButton>
            </div>
          </div>
          <div className="modal-card-content">{children}</div>
        </div>
      </div>
    );
  return null;
};

export default Modal;
