import { initialState } from "./initialState";
import {
  SET_TO_DO_LIST,
  NEW_TO_DO,
  TO_DO_CHECKED,
  TO_DO_UNCHECKED,
} from "../actions/index";

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TO_DO_LIST:
      return {
        ...state,
        toDos: [
          ...state.toDos,
          ...action.payload.toDos.map((toDo) => {
            return {
              ...toDo,
              isCheked: false,
            };
          }),
        ],
        completeToDos: [
          ...state.completeToDos,
          ...action.payload.completeToDos.map((cToDo) => {
            return {
              ...cToDo,
              isChecked: true,
            };
          }),
        ],
      };
    case NEW_TO_DO:
      return {
        ...state,
        toDos: [...state.toDos, action.payload],
      };
    case TO_DO_CHECKED: {
      let idx = state.toDos.findIndex((toDo) => toDo.id === action.payload.id);
      let front = state.toDos.slice(0, idx);
      let back = state.toDos.slice(idx + 1);
      return {
        ...state,
        toDos: [...front, action.payload, ...back],
      };
    }
    case TO_DO_UNCHECKED: {
      let idx = state.toDos.findIndex((toDo) => toDo.id === action.payload.id);
      let front = state.toDos.slice(0, idx);
      let back = state.toDos.slice(idx + 1);
      return {
        ...state,
        toDos: [...front, action.payload, ...back],
      };
    }
    default:
      return state;
  }
};

export default toDoReducer;
