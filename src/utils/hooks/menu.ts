import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { getMenu } from "@modules/user/creators";
import { IRootState } from "@store/types";

export default function () {
  const menu = useSelector(({ user }: IRootState) => user.menu);

  useEffect(() => {
    getMenu();
  }, []);

  return useMemo(() => [menu, () => getMenu()], [menu]);
}
