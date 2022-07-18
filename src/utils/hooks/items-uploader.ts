import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";
import { actionType, IRootState } from "@store/types";

export default function <I, C = {}>(
  parent: string,
  field: string,
  loadingField: string,
  creator: actionType<C>,
  params?: C
): [{ items: I; loading: boolean }, () => void] {
  const dispatch = useDispatcher<C>(creator, params);
  const items: I = useSelector((state: IRootState) => state[parent][field]);
  const loading = useSelector(
    ({ global }: IRootState) => global.loadingFields[loadingField]
  );

  useEffect(() => {
    dispatch();
  }, []);

  return [{ items, loading }, () => dispatch()];
}
