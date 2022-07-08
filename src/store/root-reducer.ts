import { combineReducers } from "redux";

import global from "@modules/global/reducer";
import user from "@modules/user/reducer";
import request from "@modules/request/reducer";
import project from "@modules/project/reducer";
import { IRootState } from "@store/types";

export default combineReducers<IRootState>({
  global,
  user,
  request,
  project,
});
