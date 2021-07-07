import { combineReducers } from "redux";
import logInStatusReducer from "./logInStatusReducer";
import todoReducer from "./toDoReducer";
import chatRoomReducer from "./chatRoomReducer";

const rootReducer = combineReducers({
  logInStatusReducer,
  todoReducer,
  chatRoomReducer
});

export default rootReducer;
