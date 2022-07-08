import { Dispatch } from "redux";

export type requestPropsType<D = {}, P = {}> = {
  method: string;
  url: string;
  dispatch: Dispatch;

  type?: string;
  loadingField?: string;
  isSilent?: boolean;
  use?: string;
  params?: P;
  data?: D;
};

export type errCallbackType = {
  response: errCallbackResponseType;
  method: string;
  url: string;
  dispatch: Dispatch;
  callback: <T, R>(params: T) => R | void | PromiseRejectionEvent;
  // reject: PromiseRejectionEvent;
};

export type errCallbackResponseType = {
  status: number;
  statusText: string;
  data: string;
};
