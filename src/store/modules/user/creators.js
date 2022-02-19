import {
  AUTH_USER,
  AUTH_USER_SUCCESS,
  GET_MENU,
  GET_MENU_SUCCESS,
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  USER_CLEAR
} from "@modules/user/types";
import Request from "@utils/request";

export const getMenu = dispatch => {
  Request({
    method: "GET",
    url: "/outsource/StaffUserMenu",
    type: GET_MENU,
    dispatch
  }).then(({ value }) => {
    dispatch({
      type: GET_MENU_SUCCESS,
      value: value ? value.items : []
    });
  });
};

export const authUser = (dispatch, payload, callback) => {
  Request({
    method: "POST",
    url: "/outsource/StaffUser/Authenticate",
    data: payload,
    type: AUTH_USER,
    dispatch
  }).then(data => {
    const { token, user } = data;
    dispatch({ type: AUTH_USER_SUCCESS, value: { token, info: user } });
    callback(token, user);
  });
};

export const getUserInfo = (dispatch, id) => {
  Request({
    method: "GET",
    url: `/outsource/StaffUser${id ? "/" + id : ""}`,
    type: GET_USER_INFO,
    dispatch
  }).then(data => {
    console.log(data);
    dispatch({ type: GET_USER_INFO_SUCCESS, value: data });
  });
};

export const getRoles = (dispatch) => {
  Request({
    method: "GET",
    url: "/outsource/StaffUser/GetAllRoles",
    type: GET_ROLES,
    dispatch,
  }).then(data => {
    dispatch({ type: GET_ROLES_SUCCESS, value: data });
  });
};

export const logout = (dispatch) => dispatch({ type: USER_CLEAR });