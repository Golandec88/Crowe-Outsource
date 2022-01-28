import { useDispatch } from "react-redux";

const useDispatcher = (action, params, callback = () => {}) => {
  const dispatch = useDispatch();

  return () => action(dispatch, params instanceof Function ? params() : params, callback);
};

export default useDispatcher;