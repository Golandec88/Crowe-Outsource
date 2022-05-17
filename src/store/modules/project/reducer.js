import * as types from "@modules/project/types";
import combiner from "@utils/store-combiner";
import initialState from "@modules/project/store";

export default function (state = initialState, { type, value }) {
  switch (type) {
    case types.SET_PROJECTS: return combiner(state, { projects: value });
    case types.SET_CLIENTS: return combiner(state, { clients: value });
    case types.SET_OPERATORS: return combiner(state, { operators: value });
    default: return state;
  }
}
