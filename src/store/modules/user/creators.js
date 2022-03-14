import * as types from "@modules/user/types";
import Request from "@utils/request";

export const getMenu = dispatch => {
  Request({
    method: "GET",
    url: "/crm/StaffUserMenu",
    type: types.GET_MENU,
    dispatch
  }).then(({ value }) => {
    dispatch({
      type: types.SET_MENU,
      value: value ? value.items : []
    });
  });
};
export const authUser = (dispatch, payload, callback) => {
  Request({
    method: "POST",
    url: "/crm/StaffUser/Authenticate",
    data: payload,
    type: types.AUTH_USER,
    dispatch
  }).then(data => {
    const { token, user } = data;
    dispatch({ type: types.AUTH_USER_SUCCESS, value: { token, info: user } });
    callback(token, user);
  });
};
export const getUserInfo = (dispatch, id) => {
  Request({
    method: "GET",
    url: `/crm/StaffUser${id ? "/" + id : ""}`,
    type: types.GET_USER_INFO,
    dispatch
  }).then(data => {
    dispatch({ type: types.SET_USER_INFO, value: data });
  });
};
export const getRoles = dispatch => {
  Request({
    method: "GET",
    url: "/crm/StaffUser/GetAllRoles",
    type: types.GET_ROLES,
    dispatch,
  }).then(data => {
    dispatch({ type: types.SET_ROLES, value: data });
  });
};
export const logout = dispatch => dispatch({ type: types.USER_CLEAR });