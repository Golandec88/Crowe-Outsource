import initialState from "@modules/user/store";
import * as types from "@modules/user/action-types";
import combiner from "@utils/store-combiner";
import { dispatchType } from "@modules/global/types";

export default function <T>(
  state = initialState,
  { type, value }: dispatchType<T>
) {
  switch (type) {
    case types.GET_MENU:
      return combiner(state, { menu: { items: [] } });
    case types.SET_MENU:
      return combiner(state, { menu: { items: value } });
    case types.AUTH_USER:
      return combiner(state, { error: false, info: {} });
    case types.AUTH_USER_SUCCESS:
      return combiner(state, { ...value });
    case types.GET_ROLES:
      return combiner(state, { roles: [] });
    case types.SET_ROLES:
      return combiner(state, { roles: value });
    case types.GET_USER_INFO:
      return combiner(state, { info: [] });
    case types.SET_USER_INFO:
      return combiner(state, { info: value });
    case types.USER_CLEAR:
      return combiner(state, { info: {}, token: null });
    case types.GET_OPERATORS:
      return combiner(state, { operators: [] });
    case types.SET_OPERATORS:
      return combiner(state, { operators: value });
    case types.SET_ACTIVITIES:
      return combiner(state, { activities: value });
    default:
      return state;
  }
}
