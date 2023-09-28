import { useSelector } from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";
import type { RootState } from "../redux/rootReducer";

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
