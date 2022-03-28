import * as types from "@modules/manager/types";
import Request from "@utils/request";

export const getAllClassifications = dispatch => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/GetAllClassifications",
    type: types.GET_ALLCLASSIFICATIONS,
    data: {},
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_ALLCLASSIFICATIONS, value: data });
  });
};