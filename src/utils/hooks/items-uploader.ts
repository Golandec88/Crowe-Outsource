import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";
import { IRootState } from "@store/types";

// TODO запихни этот тип, куда посчитаешь нужным))
type Action<P> = (params: P) => void

export default function <I, T>(
  parent: string,
  field: string,
  loadingField: string,
  creator: Action<T>,
  params?: T
): [{ items: I; loading: boolean }, () => void] {
  const dispatch = useDispatcher(creator, params);
  const items: I = useSelector((state: IRootState) => state[parent][field]);
  const loading = useSelector(
    ({ global }: IRootState) => global.loadingFields[loadingField]
  );

  useEffect(() => {
    dispatch();
  }, []);

  return [{ items, loading }, () => dispatch()];
}
