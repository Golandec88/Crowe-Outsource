import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";
import { loadingType, RootState } from "@modules/global/types";

export default <T>(
  parent: string,
  field: string,
  loadingField: loadingType,
  creator: () => any,
  params?: T
) => {
  const dispatch = useDispatcher(creator, params);
  const items = useSelector((state: RootState) => state[parent][field]);
  const loading = useSelector(
    ({ global }: RootState) => global.loadingFields[loadingField]
  );

  useEffect(() => {
    dispatch();
  }, []);

  return [{ items, loading }, () => dispatch()];
};
