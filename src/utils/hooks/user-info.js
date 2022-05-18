import { useEffect } from "react";
import { useSelector } from "react-redux";

import useDispatcher from "@hooks/dispatcher";

import { getUserInfo } from "@modules/user/creators";
import { getRoles as getRolesAction } from "@modules/user/creators";
import useLocalStorage from "@hooks/local-storage";

export default function () {
  const { info, roles } = useSelector(({ user }) => user);
  const getInfo = useDispatcher(getUserInfo);
  const getRoles = useDispatcher(getRolesAction);
  const isAuth = useLocalStorage("ABV_CRM.token").item;

  useEffect(() => {
    if (Object.keys(info).length === 0 && isAuth) getInfo();
    getRoles();
  }, []);

  return [info, roles[info.role]];
}
