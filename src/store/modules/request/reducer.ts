import initialState from "@modules/request/store";
import * as types from "@modules/request/actions-types";
import combiner from "@utils/store-combiner";
import { dispatchType } from "@store/types";

export default function <T>(
  state = initialState,
  { type, value }: dispatchType<T>
) {
  switch (type) {
    case types.GET_REQUESTS:
      return combiner(state, { requests: [] });
    case types.SET_REQUESTS:
      return combiner(state, { requests: value });
    case types.GET_CLASSIFICATIONS:
      return combiner(state, { classifications: [] });
    case types.SET_CLASSIFICATIONS:
      return combiner(state, { classifications: value });
    case types.SET_REQUEST_STATUSES:
      return combiner(state, { statuses: value });
    case types.GET_TRANSACTIONS:
      return combiner(state, { transactions: [] });
    case types.SET_TRANSACTIONS:
      return combiner(state, { transactions: value });
    default:
      return state;
  }
}
