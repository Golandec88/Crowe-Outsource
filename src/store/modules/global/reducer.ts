import initialState from "@modules/global/store";
import * as types from "@modules/global/action-types";
import combiner from "@utils/store-combiner";
import { dispatchType } from "@modules/global/types";

export default function <T>(
  state = initialState,
  { type, value }: dispatchType<T>
) {
  switch (type) {
    case types.SET_MESSAGE:
      return combiner(state, { message: value });
    case types.CLEAR_MESSAGE:
      return combiner(state, { message: { type: null, text: null } });
    case types.TOGGLE_LOADING: {
      return combiner(state, {
        loadingFields: combiner(state.loadingFields, value),
      });
    }
    default:
      return state;
  }
}