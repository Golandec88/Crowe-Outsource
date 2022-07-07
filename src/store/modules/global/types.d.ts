export type dispatchType<T> = { type: string; value: T };

export type loadingType = {
  field: string;
  value: boolean;
};

export type callbackType = (data?: any, user?: any) => void;
