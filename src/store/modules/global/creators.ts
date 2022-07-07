import { Dispatch } from "redux";
import * as types from "@modules/global/action-types";
import { loadingType } from "@modules/global/types";

export function setMessage(dispatch: Dispatch, message: string) {
  dispatch({ type: types.CLEAR_MESSAGE });
  dispatch({ type: types.SET_MESSAGE, value: message });
}

export function toggleLoading(
  dispatch: Dispatch,
  { field, value }: loadingType
) {
  dispatch({
    type: types.TOGGLE_LOADING,
    value: { [field]: value },
  });
}
