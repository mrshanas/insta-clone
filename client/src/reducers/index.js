import { combineReducers } from "redux";
import { goalsReducer } from "./goals";
import { users } from "./auth";
export default combineReducers({
  goalsReducer,
  users,
});
