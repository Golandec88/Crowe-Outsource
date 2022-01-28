import axios from "axios";
import { SET_MESSAGE } from "@modules/user/types";

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
      .catch(({ message }) => {
        dispatch({ type: SET_MESSAGE, value: {
          message: {
            type: "error",
            text: message
          },
          error: true,
        } });
        reject(message);
      });
  });
};

export default Request;