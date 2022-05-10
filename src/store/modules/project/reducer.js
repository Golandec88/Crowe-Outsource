import * as types from "@modules/project/types";
import combiner from "@utils/store-combiner";
import initialState from "@modules/project/store";

export default function (state = initialState, { type, value }) {
  switch (type) {
    case types.SET_PROJECTS: return combiner(state, { projects: value });
    default: return state;
  }
}
