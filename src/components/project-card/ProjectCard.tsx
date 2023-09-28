import { FC, MouseEvent } from "react";
import Card from "../ui-kit/card/Card";
import { useNavigate } from "react-router-dom";
import { TProject } from "../../types/Project";
import useAppDispatch from "../../hooks/useAppDispatch";
import { removeProject } from "../../redux/project/project.actions";
import RoundButton from "../ui-kit/button/RoundButton";
import TrashCanIcon from "../../assets/icons/TrashCan";

import "./ProjectCard.styles.scss";

interface Props {
  project: TProject;
}

const ProjectCard: FC<Props> = ({ project }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const clickHandler = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch(removeProject(id));
  };

  return (
    <div onClick={() => navigate("/project/" + project.id)}>
      <Card className="project-card card-link">
        <div className="project-card-container">
          <h2 className="project-title">{project.title}</h2>
          <div className="project-delete-button">
            <RoundButton onClick={(e) => clickHandler(e, project.id)}>
              <TrashCanIcon color="red" width="16" height="16" />
            </RoundButton>
          </div>
        </div>
        <p className="project-description">{project.description}</p>
      </Card>
    </div>
  );
};

export default ProjectCard;
