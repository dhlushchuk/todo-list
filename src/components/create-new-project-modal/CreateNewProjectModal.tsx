import { ChangeEvent, FC, useState } from "react";
import Modal from "../ui-kit/modal/Modal";
import Button from "../ui-kit/button/Button";
import useAppDispatch from "../../hooks/useAppDispatch";
import { TProject } from "../../types/Project";
import { addProject } from "../../redux/project/project.actions";
import Input from "../ui-kit/input/Input";

import "./CreateNewProjectModal.styles.scss";

interface Props {
  show: boolean;
  close: () => void;
}

const initialState: TProject = {
  id: 0,
  title: "",
  description: "",
  boards: [
    {
      id: 1,
      title: "QUEUE",
      cards: [],
    },
    {
      id: 2,
      title: "DEVELOPMENT",
      cards: [],
    },
    {
      id: 3,
      title: "DONE",
      cards: [],
    },
  ],
};

const CreateNewProjectModal: FC<Props> = ({ show, close }) => {
  const dispatch = useAppDispatch();
  const [newProject, setNewProject] = useState<TProject>(initialState);
  const createProject = () => {
    newProject.id = Date.now();
    dispatch(addProject(newProject));
    close();
    setNewProject(initialState);
  };

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProject((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Modal isShow={show} close={close}>
      <div className="new-project-modal-container">
        <h3>Create new project</h3>
        <Input
          type="text"
          name="title"
          placeholder="Project title"
          value={newProject.title}
          onChange={changeHandler}
          autoFocus
        />
        <Input
          type="text"
          name="description"
          placeholder="Project description"
          value={newProject.description}
          onChange={changeHandler}
        />
        <div className="new-project-modal-button-wrapper">
          <Button disabled={!newProject.title} onClick={createProject}>
            <b>Create project</b>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateNewProjectModal;
