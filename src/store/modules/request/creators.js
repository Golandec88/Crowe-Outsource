import * as types from "./types";
import Request from "@utils/request";

export const getRequests = dispatch => {
  Request({
    method: "POST",
    url: "/crm/Request/GetAll",
    type: types.GET_REQUESTS,
    data: {},
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_REQUESTS, value: data });
  });
};