import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMenu } from "@modules/user/creators";
import { RootState } from "@modules/global/types";

export default function () {
  const dispatch = useDispatch();
  const menu = useSelector(({ user }: RootState) => user.menu.items);

  useEffect(() => {
    getMenu(dispatch);
  }, [dispatch]);

  return useMemo(() => [menu, () => getMenu(dispatch)], [dispatch, menu]);
}
