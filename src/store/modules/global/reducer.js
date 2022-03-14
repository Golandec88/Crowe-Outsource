import initialState from "@modules/global/store";
import * as types from "@modules/global/types";
import combiner from "@utils/store-combiner";

export default (state = initialState, { type, value }) => {
  switch (type) {
    case types.SET_MESSAGE: {
      return combiner(state, {
        message: value
      });
    }
    default: return state;
  }
};