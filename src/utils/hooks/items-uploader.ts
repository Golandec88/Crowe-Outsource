import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";
import { IRootState } from "@store/types";

export default <T, C>(
  parent: string,
  field: string,
  loadingField: string,
  creator: (c?: C) => void,
  params?: T
) => {
  const dispatch = useDispatcher(creator, params);

  const items = useSelector((state: IRootState) => state[parent][field]);

  const loading: boolean = useSelector(
    ({ global }: IRootState) => global.loadingFields[loadingField]
  );

  useEffect(() => {
    dispatch();
  }, []);

  return [{ items, loading }, () => dispatch()];
};
