import axios from "axios";
import { setMessage, toggleLoading } from "@modules/global/creators";

export default function Request(props) {
  const {
    data = {},
    method,
    url,
    params,
    type,
    dispatch,
    loadingField
  } = props;
  const token = localStorage.getItem("ABV_CRM.token");
  const headers = Object.assign(token ? {
    "Authorization": "Bearer " + token,
  } : {}, {
    "Content-Type": "application/json"
  });

  return new Promise((resolve, reject) => {
    if (dispatch && type) dispatch({ type });
    toggle(dispatch, loadingField, true);
    axios({
      method: method.toString().toLowerCase(),
      data: data ? data : {},
      headers,
      url,
      params
    }).then(({ data }) => resolve(data))
      .catch(({ response }) => {
        const { status, statusText, data } = response;

        if (status === 401) {
          localStorage.removeItem("ABV_CRM.token");
          window.location.href = "auth";
        }
        setMessage(dispatch, formatMessage(method, url, statusText, data));
        reject(statusText);
      })
      .finally(() => toggle(dispatch, loadingField, false));
  });
}

function toggle(dispatch, field, value) {
  if(field) toggleLoading(dispatch, { field, value });
}

function formatMessage(method, url, statusText, message) {
  return { type: "error", text: `Error: ${method.toString().toUpperCase()}${url}: ${statusText}. ${message ? "Message: " + message : ""}` };
}
