import { useSelector } from "react-redux";
import { useEffect } from "react";
import useDispatcher from "@hooks/dispatcher";

export default (parent, field, loadingField, creator, params) => {
  const dispatch = useDispatcher(creator, params);
  const items = useSelector(state => state[parent][field]);
  const loading = useSelector(({ global }) => global.loadingFields[loadingField]);

  useEffect(() => {
    dispatch();
  }, []);

  return [{ items, loading }, () => dispatch()];
};
