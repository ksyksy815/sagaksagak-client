import { initialState } from "./initialState";
import {
  SET_ACCESS_TOKEN,
  LOG_OUT,
  LOG_IN,
  FIRST_LOG_IN,
  SET_FIRST_LOGIN_FALSE,
  CHANGE_USERNAME,
  CHANGE_CATEGORY,
} from "../actions/index";

const logInStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.payload };
    case FIRST_LOG_IN:
      return { ...state, user: action.payload };
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        user: { ...state.user, accessToken: action.payload.token },
      };
    case LOG_OUT:
      return { ...state, user: action.payload };
    case SET_FIRST_LOGIN_FALSE:
      return {
        ...state,
        user: { ...state.user, isFirstLogedIn: action.payload.isFirstLogedIn },
      };
    case CHANGE_USERNAME:
      return {
        ...state,
        user: { ...state.user, username: action.payload.username },
      };
    case CHANGE_CATEGORY:
      return {
        ...state,
        user: { ...state.user, category: action.payload.category },
      };
    default:
      return state;
  }
};

export default logInStatusReducer;
