import { combineReducers } from "redux";
import logInStatusReducer from "./logInStatusReducer";
import todoReducer from "./toDoReducer";

const rootReducer = combineReducers({
  logInStatusReducer,
  todoReducer,
});

export default rootReducer;
