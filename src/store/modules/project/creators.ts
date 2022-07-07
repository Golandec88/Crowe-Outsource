import * as types from "@modules/project/action-types";
import Request from "@utils/request";
import { Dispatch } from "redux";
import {
  clientsAndProjectsType,
  getProjectsType,
  operatorActivityType,
} from "@modules/project/types";
import { callbackType } from "@modules/global/types";

export const getProjects = (
  dispatch: Dispatch,
  { role, id }: getProjectsType
) => {
  Request({
    method: "GET",
    url: `/crm/Project/GetProjectsBy${
      role.charAt(0).toUpperCase() + role.slice(1)
    }/${id}`,
    type: types.GET_PROJECTS,
    loadingField: "projects",
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_PROJECTS, value: data ? data : [] });
  });
};
export const attachClientToProject = (
  { clients, project }: clientsAndProjectsType,
  callback: callbackType
) => {
  Request({
    method: "PATCH",
    url: "/crm/Project/AttachClients/" + project,
    data: {
      requestsIds: clients,
    },
  }).then(callback);
};
export const removeClientsFromProject = (
  { clients, project }: clientsAndProjectsType,
  callback: callbackType
) => {
  Request({
    method: "PATCH",
    url: "/crm/Project/RemoveClients/" + project,
    data: {
      requestsIds: clients,
    },
  }).then(callback);
};
export const addOperatorActivity = (
  { operator, client }: operatorActivityType,
  callback: callbackType
) => {
  Request({
    method: "PATCH",
    url: "/crm/OperatorActivity/AddActivity/" + operator,
    data: {
      requestId: client,
    },
  }).then(callback);
};

export const getProjectClients = (dispatch: Dispatch, id: string) => {
  Request({
    method: "GET",
    url: "/crm/Project/GetClients/" + id,
    loadingField: "projectClients",
    type: types.GET_CLIENTS,
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_CLIENTS, value: data });
  });
};
export const getProjectOperators = (dispatch: Dispatch, id: string) => {
  Request({
    method: "GET",
    url: "/crm/Project/GetOperatorsActivityByProject/" + id,
    loadingField: "operators",
    type: types.GET_OPERATORS,
    dispatch,
  }).then(({ data }) => {
    dispatch({ type: types.SET_OPERATORS, value: data.activities });
  });
};
export const createProject = (
  dispatch: Dispatch,
  name: string,
  id: string,
  callback: callbackType
) => {
  Request({
    url: "/crm/Project",
    method: "POST",
    data: {
      name,
      managerId: id,
    },
    dispatch,
  }).then(callback);
};
