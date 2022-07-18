import { useDispatchFuncType } from "@hooks/types";

const useDispatcher = <T, C = {}>(
  action: useDispatchFuncType<T>,
  params?: T,
  callback?: (args: C) => void
) => {
  return () => action(params instanceof Function ? params() : params, callback);
};

export default useDispatcher;
