import { useEffect } from "react";
import { useSelector } from "react-redux";

import useDispatcher from "@hooks/dispatcher";

import { getUserInfo } from "@modules/user/creators";
import { getRoles as getRolesAction } from "@modules/user/creators";

const useUserInfo = () => {
  const { info, roles } = useSelector(({ user }) => user);
  const getInfo = useDispatcher(getUserInfo);
  const getRoles = useDispatcher(getRolesAction);

  useEffect(() => {
    if(Object.keys(info.items).length === 0) getInfo();
    getRoles();
  }, []);

  return [info.items, roles.items[info.items.role]];
};

export default useUserInfo;