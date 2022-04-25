import * as types from "@modules/request/types";
import Request from "@utils/request";

export const getRequests = (dispatch, status) => {
  Request({
    method: "POST",
    url: "/crm/Request/GetAll",
    type: types.GET_REQUESTS,
    loadingField: "requests",
    data: status,
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_REQUESTS, value: data });
  });
};

export const getRequestStatuses = dispatch => {
  Request({
    method: "GET",
    url: "/crm/Request/GetAllRequestStatuses",
    type: types.GET_REQUEST_STATUSES,
    dispatch
  }).then(data => {
    const value = typeof data === "object" ? Object.values(data) : data;
    dispatch({ type: types.SET_REQUEST_STATUSES, value });
  });
};

export const getClassifications = dispatch => {
  Request({
    method: "GET",
    url: "/crm/FileClassification/AllClassesWithSubClasses",
    type: types.GET_CLASSIFICATIONS,
    loadingField: "classifications",
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_CLASSIFICATIONS, value: data });
  });
};

export const getInfo = (dispatch, identity, callback) => {
  Request({
    method: "GET",
    url: "/edo/Utils/" + identity,
    type: types.GET_REQUEST_USER_INFO,
    loadingField: "requestUserInfo",
    dispatch
  }).then(callback);
};

export const replyOfRequest = (dispatch, info, callback) => {
  const { id, userType: user, responseType: response, comment } = info;

  Request({
    method: "POST",
    url: "/crm/Request/" + getReplyUrl() + "/" + id,
    data: { comment },
    dispatch
  }).then(callback);

  function getReplyUrl() {
    if(user === "call-center") {
      switch (response) {
        case "accept": return "CallCenterSubmit";
        case "decline": return "CallCenterReject";
        case "resend": return "CallCenterSendBack";
      }
    } else if(user === "manager") {
      switch (response) {
        case "accept": return "ManagerSubmit";
        case "decline": return "ManagerReject";
        case "resend": return "ManagerSendBack";
      }
    }
  }
};
