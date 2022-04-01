import { SET_MESSAGE } from "@modules/global/types";
import axios from "axios";

const Request = ({
  method,
  url,
  params,
  data,
  headers,
  type,
  dispatch
}) => {
  const token = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    if (dispatch) dispatch({ type });
    axios({
      headers: Object.assign(token ? {
        "Authorization": "Bearer " + token,
      } : {}, headers),
      method: method.toString().toLowerCase(),
      url,
      data,
      params
    })
      .then(({ data }) => resolve(data))
      .catch(({ response }) => {
        const { status, data } = response;

        if (status === 401) {
          localStorage.removeItem("token");
          window.location.href = "auth";
        }

        dispatch({
          type: SET_MESSAGE, value: {
            message: {
              type: "error",
              text: data.toString()
            }
          }
        });
        reject(data.toString());
      });
  });
};

export default Request;