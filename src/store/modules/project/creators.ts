import * as types from "@modules/project/action-types";
import Request from "@utils/request";
import {
  clientsAndProjectsType,
  getProjectsType,
  operatorActivityType,
  callbackType,
} from "@store/types";
import store from "@services/store-service";

const dispatch = store.dispatch;

export const getProjects = ({ role, id }: getProjectsType) => {
  Request({
    method: "GET",
    url: `/crm/Project/GetProjectsBy${
      role.charAt(0).toUpperCase() + role.slice(1)
    }/${id}`,
    type: types.GET_PROJECTS,
    loadingField: "projects",
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

export const getProjectClients = (id: string) => {
  Request({
    method: "GET",
    url: "/crm/Project/GetClients/" + id,
    loadingField: "projectClients",
    type: types.GET_CLIENTS,
  }).then(({ data }) => {
    dispatch({ type: types.SET_CLIENTS, value: data });
  });
};

export const getProjectOperators = (id: string) => {
  Request({
    method: "GET",
    url: "/crm/Project/GetOperatorsActivityByProject/" + id,
    loadingField: "operators",
    type: types.GET_OPERATORS,
  }).then(({ data }) => {
    dispatch({ type: types.SET_OPERATORS, value: data.activities });
  });
};

export const createProject = (
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
  }).then(callback);
};
