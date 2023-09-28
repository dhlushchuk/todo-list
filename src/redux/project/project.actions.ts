import { TBoard, TProject } from "../../types/Project";

import {
  ADD_PROJECT,
  SET_BOARDS,
  REMOVE_PROJECT,
  SET_PROJECT,
  SET_PROJECT_LIST,
} from "./project.types";

export const setCurrentProject = (payload: TProject) => ({
  type: SET_PROJECT,
  payload,
});

export const setProjectList = (payload: TProject[]) => ({
  type: SET_PROJECT_LIST,
  payload,
});

export const addProject = (payload: TProject) => ({
  type: ADD_PROJECT,
  payload,
});

export const removeProject = (payload: number) => ({
  type: REMOVE_PROJECT,
  payload,
});

export const setBoards = (payload: TBoard[]) => ({
  type: SET_BOARDS,
  payload,
});
