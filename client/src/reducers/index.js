import { combineReducers } from "redux";
import { goals } from "./goals";
import { users } from "./auth";
export default combineReducers({
  goals,
  users,
});
