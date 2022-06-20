import * as types from "@modules/request/types";
import Request from "@utils/request";
import axios from "axios";
import i18n from "i18next";

export const getRequests = (dispatch, status, isSilent = false) => {
  Request({
    method: "POST",
    url: "/crm/Request/GetAll",
    type: types.GET_REQUESTS,
    loadingField: "requests",
    data: status,
    dispatch,
    isSilent,
  }).then(({ data }) => {
    dispatch({ type: types.SET_REQUESTS, value: data });
  });
};
export const getRequest = (dispatch, tin, callback) => {
  Request({
    method: "GET",
    url: "/crm/Request/RequestByTin/" + tin,
    dispatch,
  }).then(({ data }) => callback(data));
};
export const getRequestStatuses = (dispatch) => {
  Request({
    method: "GET",
    url: "/crm/Request/GetAllRequestStatuses",
    type: types.GET_REQUEST_STATUSES,
    dispatch,
  }).then(({ data }) => {
    const value = typeof data === "object" ? Object.values(data) : data;
    dispatch({ type: types.SET_REQUEST_STATUSES, value });
  });
};
export const getAllClassifications = (callback) => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/GetAllClassifications",
  }).then((res) => callback(res));
};
export const getMainClassificationsId = (callback) => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/MainClassificationsId",
  }).then((res) => callback(res));
};
export const getClassifications = (dispatch) => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/AllClassesWithSubClasses",
    type: types.GET_CLASSIFICATIONS,
    loadingField: "classifications",
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_CLASSIFICATIONS, value: data.classes });
  });
};
export const downloadFile = (id, callback) => {
  Request({
    method: "GET",
    url: "/crm/Utils/DownloadFile/" + id,
    use: "fetch",
  }).then((data) => data.blob().then(callback));
};
export const uploadFile = (form, callback) => {
  const token = localStorage.getItem("ABV_CRM.token");
  axios({
    method: "post",
    data: form,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    url: "/crm/Utils/StaffUser/uploadFile",
  }).then((data) => callback(data));
};
export const deleteFiles = (filesIdArr, callback) => {
  const token = localStorage.getItem("ABV_CRM.token");
  axios({
    method: "post",
    data: { filenames: filesIdArr },
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json-patch+json",
    },
    url: "/crm/Utils/DeleteFiles",
  }).then(callback);
};

export const getTransactions = (dispatch, { fromDate, toDate }) => {
  Request({
    method: "GET",
    url: "/crm/Utils/GetTransactions",
    type: types.GET_TRANSACTIONS,
    loadingField: "transactions",
    params: {
      tin: "306865819",
      fromDate,
      toDate,
    },
    dispatch,
  }).then(({ data }) => {
    const result = [];
    for (const item of data) {
      if (item.debit > 0) result.push(item);
    }
    dispatch({
      type: types.SET_TRANSACTIONS,
      value: result,
    });
  });
};
export const replyOfRequest = (dispatch, info, callback) => {
  const {
    id,
    userType: user,
    responseType: response,
    comment,
    rejectedFilesList,
  } = info;

  Request({
    method: "POST",
    url: "/crm/Request/" + getReplyUrl() + "/" + id,
    data: createData(),
    dispatch,
  }).then(callback);

  function getReplyUrl() {
    if (user === "call-center") {
      switch (response) {
        case "accept":
          return "CallCenterSubmit";
        case "decline":
          return "CallCenterReject";
        case "resend":
          return "CallCenterSendBack";
      }
    } else if (user === "manager") {
      switch (response) {
        case "accept":
          return "ManagerSubmit";
        case "decline":
          return "ManagerReject";
        case "resend":
          return "ManagerSendBack";
      }
    }
  }
  function createData() {
    if (user === "manager") {
      if (response === "decline" || response === "resend") {
        return {
          comment,
          rejectedFiels: rejectedFilesList,
        };
      }
    }

    return { comment };
  }
};

export const addManagerActivity = ({ manager, client }, callback) => {
  Request({
    method: "PATCH",
    url: "/crm/OperatorActivity/AddActivity/" + manager,
    data: {
      clientTin: client,
      comment: "",
    },
  }).then(callback);
};
export const getBankByMfo = (mfo, callback) => {
  const lang = i18n.language || "ru";
  Request({
    method: "GET",
    url: "/edo/Utils/bank/getByMfo",
    params: {
      mfo,
      lang,
    },
  }).then(callback());
};
export const createRequest = (data, callback) => {
  console.log(data);
  Request({
    method: "POST",
    url: "/crm/Request/Staff/Send",
    data,
  }).then((res) => callback(res));
};
