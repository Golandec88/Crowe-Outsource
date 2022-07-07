import { useEffect } from "react";
import { useSelector } from "react-redux";

import useDispatcher from "@hooks/dispatcher";

import { getUserInfo } from "@modules/user/creators";
import { getRoles as getRolesAction } from "@modules/user/creators";
import useLocalStorage from "@hooks/local-storage";
import { roleType } from "@hooks/types";

const useUserInfo = () => {
  const { info, roles } = useSelector(({ user }: any) => user);
  const getInfo = useDispatcher(getUserInfo);
  const getRoles = useDispatcher(getRolesAction);
  const isAuth = useLocalStorage("ABV_CRM.token").item;

  useEffect(() => {
    if (Object.keys(info).length === 0 && isAuth) getInfo();
    getRoles();
  }, []);

  return [info, roles[info.role] as roleType];
};

export default useUserInfo;
