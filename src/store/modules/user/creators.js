import * as types from "@modules/user/types";
import Request from "@utils/request";

export const getMenu = dispatch => {
  Request({
    method: "GET",
    url: "/crm/StaffUserMenu",
    type: types.GET_MENU,
    loadingField: "menu",
    dispatch
  }).then(({ data }) => {
    dispatch({
      type: types.SET_MENU,
      value: data.value ? data.value.items : []
    });
  });
};
export const authUser = (dispatch, payload, callback) => {
  const params = {
    method: "POST",
    url: "/crm/StaffUser/Authenticate",
    data: payload,
    type: types.AUTH_USER,
    loadingField: "authorization",
    dispatch
  };
  Request(params).then(({ data }) => {
    const { token, user } = data;
    dispatch({ type: types.AUTH_USER_SUCCESS, value: { token, info: user } });
    callback(token, user);
  });
};
export const getUserInfo = dispatch => {
  Request({
    method: "GET",
    url: "/crm/StaffUser",
    type: types.GET_USER_INFO,
    loadingField: "userInfo",
    dispatch
  }).then(({ data }) => {
    dispatch({ type: types.SET_USER_INFO, value: data });
    localStorage.setItem("ABV_CRM.id", data.id);
  });
};
export const getStaffUserInfo = (id, callback) => {
  Request({
    method: "GET",
    url: "/crm/StaffUser",
    params: { id }
  }).then(callback);
};
export const getRoles = dispatch => {
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
export const getInfo = (dispatch, identity, callback) => {
  Request({
    method: "GET",
    url: "/edo/Utils/" + identity,
    type: types.GET_REQUEST_USER_INFO,
    loadingField: "requestUserInfo",
    dispatch
  }).then(({ data }) => callback(data));
};
export const getInfoByPinfl = (pinfl, callback) => {
  Request({
    method: "GET",
    url: "/user/EDOTaxOffice/GetPhysicalTaxPayerInfo",
    params: { tin: pinfl },
  }).then(callback);
};
export const getOperators = dispatch => {
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
export const getOperatorActivities = (id, callback) => {
  Request({
    method: "GET",
    url: "/crm/OperatorActivity/GetClientsByOperator/" + id,
  }).then(({ data }) => callback(data));
};
export const registerOperator = (dispatch, form, callback) => {
  Request({
    method: "POST",
    url: "/crm/StaffUser/Register",
    data: form,
    dispatch
  }).then(({ data }) => {
    Request({
      method: "PATCH",
      url: "/crm/StaffUser/MakeAnOperator/" + data.user.id,
    }).then(callback);
  });
};
export const logout = dispatch => dispatch({ type: types.USER_CLEAR });
