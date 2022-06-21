import * as types from "@modules/project/types";
import Request from "@utils/request";

export const getProjects = (dispatch, { role, id }) => {
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
export const attachClientToProject = ({ clients, project }, callback) => {
  Request({
    method: "PATCH",
    url: "/crm/Project/AttachClients/" + project,
    data: {
      requestsIds: clients,
    },
  }).then(callback);
};
export const removeClientsFromProject = ({ clients, project }, callback) => {
  Request({
    method: "PATCH",
    url: "/crm/Project/RemoveClients/" + project,
    data: {
      requestsIds: clients,
    },
  }).then(callback);
};
export const addOperatorActivity = ({ operator, client }, callback) => {
  Request({
    method: "PATCH",
    url: "/crm/OperatorActivity/AddActivity/" + operator,
    data: {
      clientTin: client,
    },
  }).then(callback);
};

export const getProjectClients = (dispatch, id) => {
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
export const getProjectOperators = (dispatch, id) => {
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
export const createProject = (dispatch, name, id, callback) => {
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
