import { useDispatch } from "react-redux";
import { callbackType } from "@modules/global/types";
import { useDispatchFuncType } from "@hooks/types";

const useDispatcher = <T>(
  action: useDispatchFuncType<T>,
  params?: any,
  callback?: callbackType
) => {
  const dispatch = useDispatch();

  return () =>
    action(dispatch, params instanceof Function ? params() : params, callback);
};

export default useDispatcher;
