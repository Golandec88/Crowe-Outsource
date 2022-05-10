import proptypes from "prop-types";

export function staffUserType() {
  return proptypes.shape({
    id: proptypes.string,
    login: proptypes.string,
    password: proptypes.string,
    fullName: proptypes.string,
    phoneNumber: proptypes.string,
    email: proptypes.string,
    chiefUserId: proptypes.string,
    role: proptypes.oneOf([0,1,2,3,4]),
    status: proptypes.oneOf([0,1,2,3,4])
  });
}
