import { createStore } from "redux";
import { rootReducer } from "./rootReducer";

export const store = createStore(rootReducer);

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];

export default store;
