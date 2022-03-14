import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default (parent, field, creator) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state[parent][field]);

  useEffect(() => {
    creator(dispatch);
  }, [creator, dispatch]);

  return [items, () => creator(dispatch)];
};