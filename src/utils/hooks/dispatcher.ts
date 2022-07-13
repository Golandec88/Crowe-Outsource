import { useDispatchFuncType } from "@hooks/types";

const useDispatcher = <T>(
  action: useDispatchFuncType<T>,
  params?: any,
  callback?: any
) => {
  return () => action(params instanceof Function ? params() : params, callback);
};

export default useDispatcher;
