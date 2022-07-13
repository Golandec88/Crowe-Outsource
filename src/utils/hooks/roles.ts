import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";
import { getRoles as getRolesAction } from "@modules/user/creators";
import { IRootState } from "@store/types";

const useRoles = (id: number) => {
  const roles = useSelector(({ user }: IRootState) => user.roles);
  const getRoles = useDispatcher(getRolesAction);

  useEffect(() => {
    if (id) getRoles();
  }, []);

  return {
    role: roles && roles[id],
    roles,
  };
};

export default useRoles;
