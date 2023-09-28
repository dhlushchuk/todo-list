import { TProject } from "../../types/Project";
import {
  SET_PROJECT,
  SET_PROJECT_LIST,
  ADD_PROJECT,
  REMOVE_PROJECT,
  SET_BOARDS,
} from "./project.types";

interface ProjectState {
  projectList: TProject[];
  currentProject: TProject | null;
}

const defaultState: ProjectState = {
  currentProject: null,
  projectList: [],
};

// {
//     id: 1,
//     title: 'project',
//     boards: [
//         {
//             id: 1,
//             title: "QUEUE",
//             items: [
//               { id: 1, title: "Пойти в магазин" },
//               { id: 2, title: "Выкинуть мусор" },
//               { id: 3, title: "Покушать" },
//             ],
//         },
//         {
//             id: 2,
//             title: "DEVELOPMENT",
//             items: [
//               { id: 1, title: "Пойти в магазин" },
//               { id: 2, title: "Выкинуть мусор" },
//               { id: 3, title: "Покушать" },
//             ],
//           },
//     ]
// }

const projectReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_PROJECT:
      return { ...state, currentProject: action.payload };
    case SET_PROJECT_LIST:
      return { ...state, projectList: action.payload };
    case ADD_PROJECT:
      return { ...state, projectList: [...state.projectList, action.payload] };
    case REMOVE_PROJECT:
      return {
        ...state,
        projectList: state.projectList.filter(
          (project) => project.id !== action.payload
        ),
      };
    case SET_BOARDS:
      // state.currentProject?.boards.find(board => board.id === action.payload.boardId)?.items.push(action.payload.task)

      // let newBoard
      // if(currentBoard) newBoard = [...currentBoard?.items, action.payload.task]
      // const currentProject = {...state.currentProject, boards.find(board => board.id === action.payload.boardId)?.items.push(action.payload.task)}
      // const currentBoard = state.currentProject?.boards.find(
      //   (board) => board.id === action.payload.boardId
      // );
      // if (currentBoard)
      //   currentBoard.items = [...currentBoard.items, action.payload.task];

      return {
        ...state,
        currentProject: { ...state.currentProject, boards: action.payload },
      };

    default:
      return state;
  }
};

export default projectReducer;
