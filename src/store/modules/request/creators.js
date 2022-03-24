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

export const getClassifications = dispatch => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/AllClassesWithSubClasses",
    type: types.GET_CLASSIFICATIONS,
    data: {},
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_CLASSIFICATIONS, value: data });
  });
};