import { SET_MESSAGE } from "@modules/user/types";
import axios from "axios";

const Request = ({ method, url, params, data, headers, dispatch } ) => {
  const token = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    axios({
      headers: Object.assign(token ? {
        "Authorization": "Bearer " + token,
      }: {}, headers),
      method: method.toString().toLowerCase(),
      url,
      data,
      params
    })
      .then(({ data }) => resolve(data))
      .catch(({ response }) => {
        const { status, data } = response;

        if(status === 401) {
          localStorage.removeItem("token");
          window.location.href = "auth";
        }
        dispatch({ type: SET_MESSAGE, value: {
          message: {
            type: "error",
            text: data.toString()
          },
          error: true,
        } });
        reject(data.toString());
      });
  });
};

export default Request;