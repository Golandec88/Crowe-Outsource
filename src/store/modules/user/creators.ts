import * as types from "@modules/user/action-types";
import Request from "@utils/request";
import { Dispatch } from "redux";
import { authType, registerType, callbackType } from "@store/types";

export const getMenu = (dispatch: Dispatch) => {
  Request({
    method: "GET",
    url: "/crm/StaffUserMenu",
    type: types.GET_MENU,
    loadingField: "menu",
    dispatch,
  }).then(({ data }) => {
    dispatch({
      type: types.SET_MENU,
      value: data ? data.value.items : [],
    });
  });
};

export const authUser = (
  dispatch: Dispatch,
  payload: authType,
  callback: callbackType
) => {
  const params = {
    method: "POST",
    url: "/crm/StaffUser/Authenticate",
    data: payload,
    type: types.AUTH_USER,
    loadingField: "authorization",
    dispatch,
  };
  Request(params).then(({ data }) => {
    const { token, user } = data;
    dispatch({ type: types.AUTH_USER_SUCCESS, value: { token, info: user } });
    callback(token, user);
  });
};

export const getUserInfo = (dispatch: Dispatch) => {
  Request({
    method: "GET",
    url: "/crm/StaffUser",
    type: types.GET_USER_INFO,
    loadingField: "userInfo",
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_USER_INFO, value: data });
  });
};

export const getStaffUserInfo = (
  dispatch: Dispatch,
  id: string,
  callback: callbackType
) => {
  Request({
    method: "GET",
    url: "/crm/StaffUser",
    params: { id },
    dispatch,
  }).then(callback);
};

export const getRoles = (dispatch: Dispatch) => {
  Request({
    method: "GET",
    url: "/crm/StaffUser/GetAllRoles",
    type: types.GET_ROLES,
    loadingField: "roles",
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_ROLES, value: data });
  });
};

export const getInfo = (
  dispatch: Dispatch,
  identity: string,
  callback: callbackType
) => {
  Request({
    method: "GET",
    url: "/edo/Utils/" + identity,
    type: types.GET_REQUEST_USER_INFO,
    loadingField: "requestUserInfo",
    dispatch,
  }).then(({ data }) => callback(data));
};

export const getInfoByPinfl = (
  dispatch: Dispatch,
  pinfl: string,
  callback: callbackType
) => {
  Request({
    method: "GET",
    url: "/user/EDOTaxOffice/GetPhysicalTaxPayerInfo",
    params: { tin: pinfl },
    dispatch,
  }).then(callback);
};

export const getInfoByTin = (
  dispatch: Dispatch,
  tin: string,
  callback: callbackType
) => {
  Request({
    method: "GET",
    url: "/edo/Utils/InfoByTin",
    params: { tin },
    dispatch,
  }).then(callback);
};

export const getOperators = (dispatch: Dispatch) => {
  Request({
    method: "GET",
    url: "/crm/StaffUser/GetUsersByRole/" + 2,
    loadingField: "operators",
    type: types.GET_OPERATORS,
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_OPERATORS, value: data });
  });
};

export const getOperatorActivities = (
  dispatch: Dispatch,
  id: string,
  callback: callbackType
) => {
  Request({
    method: "GET",
    url: "/crm/OperatorActivity/GetClientsByOperator/" + id,
    type: types.GET_ACTIVITIES,
    loadingField: "activities",
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_ACTIVITIES, value: data });
    callback(data);
  });
};

export const registerOperator = (
  dispatch: Dispatch,
  form: registerType,
  callback: callbackType
) => {
  Request({
    method: "POST",
    url: "/crm/StaffUser/Register",
    data: form,
    dispatch,
  }).then(({ data }) => {
    Request({
      method: "PATCH",
      url: "/crm/StaffUser/MakeAnOperator/" + data.user.id,
      dispatch,
    }).then(callback);
  });
};

export const registerUser = (
  form: registerType,
  callback: callbackType,
  dispatch: Dispatch
) => {
  Request({
    method: "POST",
    url: "/user/User/RegisterUserByAdmin",
    data: form,
    dispatch,
  }).then(callback);
};

export const logout = (dispatch: Dispatch) =>
  dispatch({ type: types.USER_CLEAR });
