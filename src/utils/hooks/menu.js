import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMenu } from "@modules/user/creators";

const useMenu = (factory, deps) => {
  const dispatch = useDispatch();
  const menu = useSelector(({ user }) => user.menu.items);

  useEffect(() => {
    getMenu(dispatch);
  }, []);

  return useMemo(() => [menu, () => getMenu(dispatch)], deps);
};

export default useMenu;