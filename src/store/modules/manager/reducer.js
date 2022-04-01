import initialState from "@modules/manager/store";
import * as types from "@modules/manager/types";
import combiner from "@utils/store-combiner";

export default (state = initialState, { type, value }) => {
  switch (type) {
    case types.GET_ALLCLASSIFICATIONS: {
      return combiner(state, {
        allClassifications: {
          items: [],
          loading: true
        }
      });
    }
    case types.SET_ALLCLASSIFICATIONS: {
      return combiner(state, {
        allClassifications: {
          items: value,
          loading: false
        }
      });
    }

    default:
      return state;
  }
};