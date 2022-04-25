import initialState from "@modules/manager/store";
import * as types from "@modules/manager/types";
import combiner from "@utils/store-combiner";

export default (state = initialState, { type, value }) => {
  switch (type) {
    case types.GET_CLASSIFICATIONS: return combiner(state, { classifications: [] });
    case types.SET_CLASSIFICATIONS: return combiner(state, { classifications: value });
    default: return state;
  }
};
