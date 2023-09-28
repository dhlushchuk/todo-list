import { ApiMockResponse } from "../helpers/mockData";
import { TProject } from "../types/Project";

const LOCAL_STORAGE_KEY = "todo-project";

export class TodoAPI {
  async fetchProjectList(): Promise<TProject[]> {
    const apiData: TProject[] = ApiMockResponse;
    let projectList: TProject[] = [];
    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
      const localStorageData: TProject[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
      );
      projectList = [...localStorageData];
    } else {
      projectList = [...apiData];
      updateLocalStorage(projectList);
    }

    return projectList;
  }
}

export async function fetchProjectList(): Promise<TProject[]> {
  const api = new TodoAPI();
  return api.fetchProjectList();
}

export function updateLocalStorage(projects: TProject[]) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
}

export function updateLocalStorageCurrentProject(project: TProject) {
  const rawProjects = localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";
  const projects: TProject[] = JSON.parse(rawProjects);
  const oldProject =
    projects.find((item: TProject) => project.id === item.id) || null;
  if (oldProject) {
    projects.splice(projects.indexOf(oldProject), 1, project);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  }
}

export function getProjectFromLocalStorage(id: number): TProject | null {
  const rawProjects = localStorage.getItem(LOCAL_STORAGE_KEY) || "[]";
  const projects: TProject[] = JSON.parse(rawProjects);
  return projects.find((project: TProject) => project.id === id) || null;
}
