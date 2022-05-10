import initialState from "@modules/global/store";
import * as types from "@modules/global/types";
import combiner from "@utils/store-combiner";

export default function (state = initialState, { type, value }) {
  switch (type) {
    case types.SET_MESSAGE: return combiner(state, { message: value });
    case types.CLEAR_MESSAGE: return combiner(state, { message: { type: null, text: null } });
    case types.TOGGLE_LOADING: {
      const { field, value: loadingValue } = value;

      return combiner(state, { loadingFields: {  ...state.loadingFields, [field]: loadingValue, } });
    }
    default: return state;
  }
}
