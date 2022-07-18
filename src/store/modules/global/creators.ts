import * as types from "@modules/global/action-types";
import { loadingType } from "@store/types";
import store from "@services/store-service";

const dispatch = store.dispatch;

export function setMessage({ text, type }: { text: string; type: string }) {
  dispatch({ type: types.CLEAR_MESSAGE });
  dispatch({ type: types.SET_MESSAGE, value: text, messageType: type });
}

export function toggleLoading({ field, value }: loadingType) {
  dispatch({
    type: types.TOGGLE_LOADING,
    value: { [field]: value },
  });
}
