import proptypes from "prop-types";

export function projectType() {
  return proptypes.shape({
    id: proptypes.string,
    managerId: proptypes.string,
    name: proptypes.string,
    clientIds: proptypes.arrayOf(proptypes.string)
  });
}
