import { initialState } from "./initialState";
import {
  SET_ACCESS_TOKEN,
  LOG_OUT,
  LOG_IN,
  FIRST_LOG_IN,
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
    default:
      return state;
  }
};

export default logInStatusReducer;
