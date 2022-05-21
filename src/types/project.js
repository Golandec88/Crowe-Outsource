import proptypes from "prop-types";

export function projectType() {
  return proptypes.shape({
    id: proptypes.string,
    managerId: proptypes.string,
    name: proptypes.string,
    clientIds: proptypes.arrayOf(proptypes.string)
  });
}

export function activityType() {
  return proptypes.shape({
    projectId: proptypes.string,
    projectName: proptypes.string,
    projectPicGuid: proptypes.string,
    clients: proptypes.arrayOf(proptypes.shape({
      tin: proptypes.string,
      fullName: proptypes.string
    }))
  });
}
