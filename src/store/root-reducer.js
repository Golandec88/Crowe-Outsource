import { combineReducers } from "redux";

import global from "@modules/global/reducer";
import user from "@modules/user/reducer";
import request from "@modules/request/reducer";
import manager from "@modules/manager/reducer";

export default combineReducers({
  global,
  user,
  request,
  manager
});