import { useEffect } from "react";
import { useSelector } from "react-redux";

import useDispatcher from "@hooks/dispatcher";

import { getUserInfo } from "@modules/user/creators";
import { getRoles as getRolesAction } from "@modules/user/creators";

export default function () {
  const { info, roles } = useSelector(({ user }) => user);
  const getInfo = useDispatcher(getUserInfo);
  const getRoles = useDispatcher(getRolesAction);

  useEffect(() => {
    if (Object.keys(info).length === 0) getInfo();
    getRoles();
  }, []);

  return [info, roles[info.role]];
}
