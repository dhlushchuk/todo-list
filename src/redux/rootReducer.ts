import { combineReducers } from "redux";
import projectReducer from "./project/project.reducer";

export const rootReducer = combineReducers({
  project: projectReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
