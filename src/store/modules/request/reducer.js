import initialState from "@modules/request/store";
import * as types from "@modules/request/types";
import combiner from "@utils/store-combiner";

export default (state = initialState, { type, value }) => {
  switch (type) {
    case types.GET_REQUESTS: {
      return combiner(state, {
        requests: {
          loading: true,
          items: []
        }
      });
    }
    case types.SET_REQUESTS: {
      return combiner(state, {
        requests: {
          loading: false,
          items: value
        }
      });
    }
    case types.GET_CLASSIFICATIONS: {
      return combiner(state, {
        classifications: {
          items: [],
          loading: true
        }
      });
    }
    case types.SET_CLASSIFICATIONS: {
      return combiner(state, {
        classifications: {
          loading: false,
          items: value
        }
      });
    }

    default:
      return state;
  }
};