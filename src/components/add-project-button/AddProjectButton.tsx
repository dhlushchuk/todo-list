import { FC } from "react";
import Card from "../ui-kit/card/Card";
import PlusIcon from "../../assets/icons/Plus";

import "./AddProjectButton.styles.scss";

interface Props {
  onClick: () => void;
}

const AddProjectButton: FC<Props> = ({ onClick }) => {
  return (
    <div className="add-project-button" onClick={onClick}>
      <Card className="card-link primary-card">
        <div className="add-project-button-container">
          <PlusIcon height="36" width="36" color="white" /> Add Project
        </div>
      </Card>
    </div>
  );
};

export default AddProjectButton;
