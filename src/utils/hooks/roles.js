import { useSelector } from "react-redux";
import { useEffect } from "react";

import useDispatcher from "@hooks/dispatcher";

import { getRoles as getRolesAction } from "@modules/user/creators";

const useRoles = (id) => {
  const roles = useSelector(({ user }) => user.roles);
  const getRoles = useDispatcher(getRolesAction);

  useEffect(() => {
    console.log(id);
    if(id) getRoles();
  }, [roles]);

  return {
    role: roles && roles[id],
    roles
  };
};

export default useRoles;