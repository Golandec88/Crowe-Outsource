import * as types from "@modules/manager/types";
import Request from "@utils/request";

export const getAllClassifications = dispatch => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/GetAllClassifications",
    type: types.GET_CLASSIFICATIONS,
    loadingField: "classifications",
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_CLASSIFICATIONS, value: data });
  });
};

export const downloadFile = id => {
  return new Promise((resolve) => {
    Request({
      method: "GET",
      url: `/crm/Utils/DownloadFile${id ? "/" + id : ""}`
    }).then(resolve);
  });
};

export const getInfoByPinfl = tin => {
  return new Promise((resolve) => {
    Request({
      method: "GET",
      url: "/user/EDOTaxOffice/GetPhysicalTaxPayerInfo",
      params: { tin },
    }).then(resolve);
  });
};
