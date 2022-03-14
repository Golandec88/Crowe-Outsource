import { combineReducers } from "redux";

import global from "@modules/global/reducer";
import user from "@modules/user/reducer";
import request from "@modules/request/reducer";

export default combineReducers({
  global,
  user,
  request
});