import axios, { AxiosRequestConfig } from "axios";
import { setMessage, toggleLoading } from "@modules/global/creators";
import { errCallbackType, requestPropsType } from "@utils/types";
import { Dispatch } from "redux";

export default function Request<D, P>(props: requestPropsType<D, P>) {
  const {
    data = {},
    method,
    url,
    params,
    type,
    dispatch,
    loadingField,
    use = "axios",
    isSilent = false,
  } = props as requestPropsType<D, P>;

  const token = localStorage.getItem("ABV_CRM.token");
  const headers = Object.assign(
    token
      ? {
          Authorization: "Bearer " + token,
        }
      : {},
    {
      "Content-Type": "application/json",
    }
  );

  return new Promise((resolve, reject) => {
    if (dispatch && type) dispatch({ type });
    if (!isSilent) toggle(dispatch, loadingField, true);

    if (use === "axios") {
      axios({
        method: method.toString().toLowerCase(),
        data: data ? data : {},
        headers,
        url,
        params,
      } as AxiosRequestConfig)
        .then(resolve)
        .catch(({ response }) =>
          errCallback({ response, method, url, dispatch, callback: reject })
        )
        .finally(() => toggle(dispatch, loadingField, false));
    } else if (use === "fetch") {
      fetch(url, {
        method: method.toString().toLowerCase(),
        headers: { Authorization: "Bearer " + token },
      })
        .then(resolve)
        .catch(({ response }) =>
          errCallback({ response, method, url, dispatch, callback: reject })
        )
        .finally(() => toggle(dispatch, loadingField, false));
    }
  });
}

function toggle(dispatch: Dispatch, field: string | unknown, value: boolean) {
  if (typeof field === "string") toggleLoading(dispatch, { field, value });
}

function formatMessage(
  method: string,
  url: string,
  statusText: string,
  message: string
): { type: string; text: string } {
  return {
    type: "error",
    text: `Error: ${method.toString().toUpperCase()}${url}: ${statusText}. ${
      message ? "Message: " + message : ""
    }`,
  };
}

function errCallback({
  response,
  method,
  url,
  dispatch,
  callback,
}: errCallbackType) {
  const { status, statusText, data } = response;

  if (status === 401) {
    localStorage.removeItem("ABV_CRM.token");
    window.location.href = "auth";
  }
  setMessage(dispatch, formatMessage(method, url, statusText, data));
  if (callback) callback<string, string>(statusText);
}
