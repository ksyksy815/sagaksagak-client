import { initialState } from "./initialState";
import {
  SET_TO_DO_LIST,
  NEW_TO_DO,
  TO_DO_CHECK,
  DELETE_TO_DO
} from "../actions/index";

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TO_DO_LIST:
      return {
        ...state,
        todos: [
          ...state.todos,
          ...action.payload.todos.map((todo) => {
            return {
              ...todo,
              isCheked: false,
            };
          }),
        ],
        completeTodos: [
          ...state.completeTodos,
          ...action.payload.completeTodos.map((cTodo) => {
            return {
              ...cTodo,
              checked: true,
            };
          }),
        ],
      };
    case NEW_TO_DO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TO_DO_CHECK:
      let index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      let list = state.todos.slice()
      list[index].checked = !(list[index].checked)
      
      return {
        ...state,
        todos: list
      };
    case DELETE_TO_DO:
      let idx = state.todos.findIndex((todo) => todo.id === action.payload.id);
      let copy = state.todos.slice()
      copy.splice(idx, 1)

      return {
        ...state,
        todos: copy
      };
    default:
      return state;
  }
};

export default todoReducer;
