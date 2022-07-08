import { Dispatch } from "redux";
import * as types from "@modules/global/action-types";
import { loadingType } from "@store/types";

export function setMessage(dispatch: Dispatch, { text }: { text: string }) {
  dispatch({ type: types.CLEAR_MESSAGE });
  dispatch({ type: types.SET_MESSAGE, value: text });
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
