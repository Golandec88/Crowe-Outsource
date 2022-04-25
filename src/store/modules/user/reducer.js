import initialState from "@modules/user/store";
import * as types from "@modules/user/types";
import combiner from "@utils/store-combiner";

export default (state = initialState, { type, value }) => {
  switch (type) {
    case types.GET_MENU: return combiner(state, { menu: { items: [] } });
    case types.SET_MENU: return combiner(state, { menu: { items: value } });
    case types.AUTH_USER: return combiner(state, { error: false, info: {} });
    case types.AUTH_USER_SUCCESS: return combiner(state, { token: value.token, info: value.info });
    case types.GET_ROLES: return combiner(state, { roles: [] });
    case types.SET_ROLES: return combiner(state, { roles: value });
    case types.GET_USER_INFO: return combiner(state, { info: [] });
    case types.SET_USER_INFO: return combiner(state, { info: value });
    case types.USER_CLEAR: return combiner(state, { info: {}, token: null });
    default: return state;
  }
};
