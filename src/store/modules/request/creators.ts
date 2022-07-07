import * as types from "@modules/request/actions-types";
import Request from "@utils/request";
import axios from "axios";
import i18n from "i18next";
import { Dispatch } from "redux";
import { callbackType } from "@modules/global/types";
import {
  addManagerActivityType,
  datesType,
  filesType,
  infoType,
  requestType,
} from "@modules/request/types";

export const getRequests = (
  dispatch: Dispatch,
  status: number[],
  isSilent: boolean = false
) => {
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

export const getRequest = (
  dispatch: Dispatch,
  tin: string,
  callback: callbackType
) => {
  Request({
    method: "GET",
    url: "/crm/Request/RequestByTin/" + tin,
    dispatch,
  }).then(({ data }) => callback(data));
};

export const getRequestStatuses = (dispatch: Dispatch) => {
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

export const getAllClassifications = (callback: callbackType) => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/GetAllClassifications",
  }).then((data) => callback(data));
};

export const getMainClassificationsId = (callback: callbackType) => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/MainClassificationsId",
  }).then((data) => callback(data));
};

export const getClassifications = (dispatch: Dispatch) => {
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

export const downloadFile = (id: string, callback: callbackType) => {
  Request({
    method: "GET",
    url: "/crm/Utils/DownloadFile/" + id,
    use: "fetch",
  }).then((data) => data.blob().then(callback));
};

export const uploadFile = (form: string[], callback: callbackType) => {
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

export const deleteFiles = (filesIdArr: string[], callback: callbackType) => {
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

export const getTransactions = (
  dispatch: Dispatch,
  { fromDate, toDate }: datesType
) => {
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

export const getClientFiles = (
  dispatch: Dispatch,
  id: string,
  callback: callbackType,
  rows: number,
  page: number
) => {
  Request({
    method: "GET",
    url: "/crm/FileHosting/Client/Files/" + id,
    type: types.GET_CLIENT_FILES,
    loadingField: "clientFiles",
    params: {
      pageNumber: page || 1,
      pageSize: rows || 5,
    },
    dispatch,
  }).then(({ data }) => callback(data));
};

export const getStaffUserSentFiles = (
  dispatch: Dispatch,
  id: string,
  callback: callbackType,
  staffId: string,
  rows: number,
  page: number
) => {
  Request({
    method: "GET",
    url: "/crm/FileHosting/Staff/Files/" + id + "/" + staffId,
    type: types.GET_STAFFUSER_FILES,
    loadingField: "staffUserFiles",
    params: {
      pageNumber: page || 1,
      pageSize: rows || 5,
    },
    dispatch,
  }).then(({ data }) => callback(data));
};

export const getAllStaffUsersWhoSentFilesToThisRequest = (
  dispatch: Dispatch,
  id: string,
  callback: callbackType,
  rows: number,
  page: number
) => {
  Request({
    method: "GET",
    url: "/crm/FileHosting/Staff/All/" + id,
    type: types.GET_STAFFUSERS,
    loadingField: "staffUserFiles",
    params: {
      pageNumber: page || 1,
      pageSize: rows || 5,
    },
    dispatch,
  }).then(({ data }) => callback(data));
};

export const staffUserUploadFiles = (file: File[], callback: callbackType) => {
  const dataForm = new FormData();
  const token = localStorage.getItem("ABV_CRM.token");

  for (let i = 0; i < file.length; i++) {
    dataForm.append("files", file[i]);
  }

  axios
    .post("/crm/FileHosting/UploadFiles", dataForm, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => callback(data.data));
};

export const staffUserSendFiles = (
  id: string,
  files: filesType[],
  dispatch: Dispatch
) => {
  Request({
    method: "POST",
    url: "/crm/FileHosting/StaffUser/Send/" + id,
    data: { filesInfo: files },
    dispatch,
  });
};

export const deleteUploadedFiles = (guids: string[], dispatch: Dispatch) => {
  Request({
    method: "DELETE",
    url: "/crm/FileHosting/Files",
    data: { filesGuids: guids },
    dispatch,
  });
};

export const deleteStaffSentFiles = (
  staffId: string,
  reqId: string,
  guids: string[],
  dispatch: Dispatch
) => {
  Request({
    method: "DELETE",
    url: "/crm/FileHosting/Staff/" + staffId + "/" + reqId,
    data: { filesGuids: guids },
    dispatch,
  });
};

export const deleteClientSentFiles = (
  reqId: string,
  guids: string[],
  dispatch: Dispatch
) => {
  Request({
    method: "DELETE",
    url: "/crm/FileHosting/Client/" + reqId,
    data: { filesGuids: guids },
    dispatch,
  });
};

export const replyOfRequest = (
  dispatch: Dispatch,
  info: infoType,
  callback: callbackType
) => {
  console.log(info);
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

export const addManagerActivity = (
  { manager, client }: addManagerActivityType,
  callback: callbackType
) => {
  Request({
    method: "PATCH",
    url: "/crm/OperatorActivity/AddActivity/" + manager,
    data: {
      clientTin: client,
      comment: "",
    },
  }).then(callback);
};

export const getBankByMfo = (mfo: string, callback: callbackType) => {
  const lang = i18n.language || "ru";
  Request({
    method: "GET",
    url: "/edo/Utils/bank/getByMfo",
    params: {
      mfo,
      lang,
    },
  }).then((data) => callback(data));
};
export const createRequest = (
  data: requestType,
  callback: callbackType,
  dispatch: Dispatch
) => {
  Request({
    method: "POST",
    url: "/crm/Request/Staff/Send",
    data,
    dispatch,
  }).then(callback);
};
