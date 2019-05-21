import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions";
import {
  GET_TOP_NINE,
  GET_TOP_NINE_SUCCESS,
  GET_TOP_NINE_FAILED
} from "../actions";

const initialState = {
  user: null,
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
    case GET_TOP_NINE:
       return {};
    case GET_TOP_NINE_SUCCESS:
       
       return {
        ...state,
        topNine: action.payload,
      };
    case GET_TOP_NINE_FAILED:
    
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
