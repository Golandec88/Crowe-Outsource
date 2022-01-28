import initialState from "@modules/user/store";
import combiner from "@utils/store-combiner";
import { 
  AUTH_USER, 
  AUTH_USER_SUCCESS, 
  USER_CLEAR,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_MENU,
  GET_MENU_SUCCESS,
  SET_MESSAGE
} from "@modules/user/types";

export default (state = initialState, { type, value }) => {
  switch (type) {
    case GET_MENU: return combiner(state,{
      menu: {
        loading: true,
        items: []
      }
    });
    case GET_MENU_SUCCESS: return combiner(state,{
      menu: {
        loading: false,
        items: value
      }
    });
    case AUTH_USER: return combiner(state, {
      loading: true,
      error: false,
      info: {}
    });
    case AUTH_USER_SUCCESS: return combiner(state, {
      token: value.token,
      loading: false,
      error: false,
      info: {
        items: value.info
      },
    });
    case GET_ROLES: return combiner(state, {
      roles: {
        loading: true,
        items: []
      },
    });
    case GET_ROLES_SUCCESS: return combiner(state, {
      roles: {
        loading: false,
        items: value
      }
    });
    case GET_USER_INFO: return combiner(state, {
      info: {
        loading: true,
        items: []
      },
    });
    case GET_USER_INFO_SUCCESS: return combiner(state, {
      info: {
        loading: false,
        items: value
      },
    });
    case USER_CLEAR: return combiner(state, {
      info: {},
      token: null
    });
    case SET_MESSAGE: return combiner(state, {
      loading: false,
      error: value.error,
      message: {
        type: value.message.type,
        text: value.message.text
      }
    });
    default: return state;
  }
};