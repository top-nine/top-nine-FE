import axios from 'axios';

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const GET_TOP_NINE = "GET_TOP_NINE";
export const GET_TOP_NINE_SUCCESS = "GET_TOP_NINE_SUCCESS";
export const GET_TOP_NINE_FAILED = "GET_TOP_NINE_FAILED";

export const PUT_ITEM = "PUT_ITEM";
export const PUT_ITEM_SUCCESS = "PUT_ITEM_SUCCESS";
export const PUT_ITEM_FAILED = "PUT_ITEM_FAILED";

export const POST_ITEM = "POST_ITEM";
export const POST_ITEM_SUCCESS = "POST_ITEM_SUCCESS";
export const POST_ITEM_FAILED = "POST_ITEM_FAILED";

export const DELETE_ITEM = "DELETE_ITEM";
export const DELETE_ITEM_SUCCESS = "DELETE_ITEM_SUCCESS";
export const DELETE_ITEM_FAILED = "DELETE_ITEM_FAILED";

export const loginUser = (cred, callback) => dispatch => {
    const { email, password } = cred;
    dispatch({ type: LOGIN });
    const request = axios.post('https://top-nine.herokuapp.com/auth/login', { email, password });
    request.then(function (response) {
        window.localStorage.setItem("auth", response.data.token);
        
        console.log('login', response.data.token);
        callback();
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.token }); 
    })
        .catch(function (error) {
            dispatch({ type: LOGIN_FAILED, payload: error });
        });
};

export const getTopNine = (userID) => dispatch => {
 
    dispatch({ type: GET_TOP_NINE });
   return (axios.get(`https://top-nine.herokuapp.com/home`, {
        headers: {
            "authorization": window.localStorage.getItem('auth')
        }
    })
    .then(function (response) {
       console.log('get', response.date);
        dispatch({ type: GET_TOP_NINE_SUCCESS, payload: response.data.topNine });
    })
        .catch(function (error) {
            dispatch({ type: GET_TOP_NINE_FAILED, payload: error });
        }));
};

export const itemPut = (item) => dispatch => {
    const { id, title, description, iamge_url } = item;
   
    dispatch({ type: PUT_ITEM });
    return axios.put(`http://localhost:5000/topnine/${id}`, { title, description, iamge_url })
    .then(function (response) {
      dispatch({ type: PUT_ITEM_SUCCESS, payload: response.data });
    })
      .catch(function (error) {
        dispatch({ type: PUT_ITEM_FAILED, payload: error });
      });
  }
  
  export const itemPost = (item, callback) => dispatch => {
  
    dispatch({ type: POST_ITEM });
  
    const request = axios.post(`https://top-nine.herokuapp.com/home/add-top-nine`, item,{
      headers: {
          "authorization": window.localStorage.getItem('auth')
      }
  });
    request.then(function (response) {
      callback();
      dispatch({ type: POST_ITEM_SUCCESS, payload: response.data });
    })
      .catch(function (error) {
        dispatch({ type: POST_ITEM_FAILED, payload: error });
      });
  }
  
  export const itemDelete = (id) => dispatch => {
    dispatch({ type: DELETE_ITEM });
    return (axios.delete(`https://top-nine.herokuapp.com/home/${id}/delete-top-nine`,{
      headers: {
          "authorization": window.localStorage.getItem('auth')
      }
  })
    .then(function (response) {
      dispatch({ type: DELETE_ITEM_SUCCESS, payload: response.data });
    })
      .catch(function (error) {
        dispatch({ type: DELETE_ITEM_FAILED, payload: error });
      }));
  }
  
  