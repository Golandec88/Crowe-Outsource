import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMenu } from "@modules/user/creators";

export default function () {
  const dispatch = useDispatch();
  const menu = useSelector(({ user }) => user.menu.items);

  useEffect(() => {
    getMenu(dispatch);
  }, [dispatch]);

  return useMemo(() => [menu, () => getMenu(dispatch)], [dispatch, menu]);
}
