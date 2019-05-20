import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions";

const initialState = {
  user: [],
  topNine: [],
  loggingIn: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: true,
        user: action.payload
      };

    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload,
        loggingIn: false
      };

    default:
      return state;
  }
};
