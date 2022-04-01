import * as types from "@modules/manager/types";
import Request from "@utils/request";
import axios from "axios";


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

export const downloadFile = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`/crm/Utils/DownloadFile${id ? "/" + id : ""}`, {
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
    })
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};
