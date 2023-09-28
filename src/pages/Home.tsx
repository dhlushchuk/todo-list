import { FC, useEffect, useState } from "react";
import AddProjectButton from "../components/add-project-button/AddProjectButton";
import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import { RootState } from "../redux/rootReducer";
import { setProjectList } from "../redux/project/project.actions";
import { fetchProjectList, updateLocalStorage } from "../api";
import { TProject } from "../types/Project";
import CreateNewProjectModal from "../components/create-new-project-modal/CreateNewProjectModal";
import ProjectCard from "../components/project-card/ProjectCard";

import "../styles/Home.styles.scss";

const projectsSelector = (state: RootState) => state.project;

const Home: FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const clickHandler = () => {
    setShow(true);
  };
  const dispatch = useAppDispatch();
  const { projectList } = useAppSelector(projectsSelector);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData() {
    const projectList: TProject[] = await fetchProjectList();
    dispatch(setProjectList(projectList));
  }

  useEffect(() => {
    updateLocalStorage(projectList);
  }, [projectList]);

  return (
    <div className="project-container">
      {projectList.map((project: TProject) => (
        <ProjectCard project={project} key={project.id} />
      ))}
      <AddProjectButton onClick={clickHandler} />
      <CreateNewProjectModal show={show} close={() => setShow(false)} />
    </div>
  );
};

export default Home;
