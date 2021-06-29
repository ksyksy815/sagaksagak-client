import { combineReducers } from 'redux';
import logInStatusReducer from './logInStatusReducer';
import toDoReducer from './toDoReducer';

const rootReducer = combineReducers({
  logInStatusReducer,
  toDoReducer
});

export default rootReducer;