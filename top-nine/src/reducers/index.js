import { LOGIN_SUCCESS, LOGIN_FAILED } from "../actions";
import { REGISTER_SUCCESS, REGISTER_FAILED } from "../actions";
import { GET_TOP_NINE, GET_TOP_NINE_SUCCESS, GET_TOP_NINE_FAILED } from "../actions";
import { PUT_ITEM, PUT_ITEM_SUCCESS, PUT_ITEM_FAILED } from "../actions";
import { POST_ITEM, POST_ITEM_SUCCESS, POST_ITEM_FAILED } from "../actions";
import { DELETE_ITEM, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILED } from "../actions";
import { CLEAR_ERROR } from "../actions";

const initialState = {
  token: null,
  topNine: [],
  loggingIn: false,
  error: null,
  status: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggingIn: true,
        status: 200,
        token: action.payload
      };

    case LOGIN_FAILED:
      return {
        ...state,
        error: action.payload.response.data.message,
        loggingIn: false
      };

    case REGISTER_SUCCESS:
        return {
          ...state,
          error: '',
          status: 200,
    
        };

    case REGISTER_FAILED:
      return {
        ...state,
        error:  action.payload.response.data.message

      };

    case GET_TOP_NINE:
      return {};

    case GET_TOP_NINE_SUCCESS:
      return {
        ...state,
        topNine: action.payload.sort((a, b) => (a.id > b.id ? 1 : -1)),
        status: 200,
      };

    case GET_TOP_NINE_FAILED:
      if (action.payload.response.status === 401)
        localStorage.removeItem("auth");
      return {
        ...state,
        error:  action.payload.response.data.message
      };

    case PUT_ITEM:
      return {};

    case PUT_ITEM_SUCCESS:
      return {       
         ...state,
        status: 200,
      };

    case PUT_ITEM_FAILED:
      if (action.payload.response.status === 401)
        localStorage.removeItem("auth");
      return {
        ...state,
        error:  action.payload.response.data.message
      };

    case POST_ITEM:
      return {};

    case POST_ITEM_SUCCESS:
      return {};

    case POST_ITEM_FAILED:
   
      if (action.payload.response.status === 401)
          localStorage.removeItem("auth");
      return {
        ...state,
        error:  action.payload.response.data.message
      };

    case DELETE_ITEM:
      return {};

    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        ITEMs: action.payload
      };

    case DELETE_ITEM_FAILED:
      if (action.payload.response.status === 401)
        localStorage.removeItem("auth");
      return {
        ...state,
        error:  action.payload.response.data.message
      };

    case CLEAR_ERROR:
      return{
        ...state,
        error: '',
        status: 0,
      }
      
    default:
      return state;
  }
};
