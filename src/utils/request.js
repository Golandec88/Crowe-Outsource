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
    loadingField,
    use = "axios",
    isSilent = false
  } = props;
  const token = localStorage.getItem("ABV_CRM.token");
  const headers = Object.assign(token ? {
    "Authorization": "Bearer " + token,
  } : {}, {
    "Content-Type": "application/json"
  });

  return new Promise((resolve, reject) => {
    if (dispatch && type) dispatch({ type });
    if (!isSilent) toggle(dispatch, loadingField, true);

    if(use === "axios") {
      axios({
        method: method.toString().toLowerCase(),
        data: data ? data : {},
        headers,
        url,
        params
      }).then(resolve)
        .catch(({ response }) => errCallback({ response, method, url, dispatch, reject }))
        .finally(() => toggle(dispatch, loadingField, false));

    } else if(use === "fetch") {
      fetch(url, {
        method: method.toString().toLowerCase(),
        headers: { "Authorization": "Bearer " + token } }
      ).then(resolve)
        .catch(({ response }) => errCallback({ response, method, url, dispatch, reject }))
        .finally(() => toggle(dispatch, loadingField, false));
    }
  });
}

function toggle(dispatch, field, value) {
  if(field) toggleLoading(dispatch, { field, value });
}

function formatMessage(method, url, statusText, message) {
  return { type: "error", text: `Error: ${method.toString().toUpperCase()}${url}: ${statusText}. ${message ? "Message: " + message : ""}` };
}

function errCallback({ response, method, url, dispatch, callback }) {
  const { status, statusText, data } = response;

  if (status === 401) {
    localStorage.removeItem("ABV_CRM.token");
    window.location.href = "auth";
  }
  setMessage(dispatch, formatMessage(method, url, statusText, data));
  if(callback) callback(statusText);
}
