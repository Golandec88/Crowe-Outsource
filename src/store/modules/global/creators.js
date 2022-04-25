import * as types from "@modules/global/types";


export function setMessage(dispatch, message) {
  dispatch({ type: types.CLEAR_MESSAGE });
  dispatch({ type: types.SET_MESSAGE, value: message });
}
export function toggleLoading(dispatch, { field, value }) {
  dispatch({ type: types.TOGGLE_LOADING, value: {
    field,
    value
  } });
}
