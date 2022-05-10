import * as types from "@modules/project/types";
import Request from "@utils/request";

export const getProjects = (dispatch, { role, id }) => {
  Request({
    method: "GET",
    url: `/crm/Project/GetProjectsBy${role.charAt(0).toUpperCase() + role.slice(1)}/${id}`,
    type: types.GET_PROJECTS,
    loadingField: "projects",
    dispatch
  }).then(({ data }) => {
    dispatch({ type: types.SET_PROJECTS, value: data });
  });
};

export const attachClientToProject = ({ clients, project }, callback) => {
  Request({
    method: "PATCH",
    url: "/crm/Project/AttachClients/" + project,
    data: {
      clientsIds: clients
    }
  }).then(callback);
};

export const addOperatorActivity = ({ operator, client, comment }, callback) => {
  Request({
    method: "PATCH",
    url: "/crm/OperatorActivity/AddActivity/" + operator,
    data: {
      clientsId: client,
      comment: comment
    }
  }).then(callback);
};
