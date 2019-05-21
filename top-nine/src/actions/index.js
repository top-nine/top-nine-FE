import axios from 'axios';

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const GET_TOP_NINE = "GET_TOP_NINE";
export const GET_TOP_NINE_SUCCESS = "GET_TOP_NINE_SUCCESS";
export const GET_TOP_NINE_FAILED = "GET_TOP_NINE_FAILED";

export const loginUser = (cred, callback) => dispatch => {
    const { email, password } = cred;
    dispatch({ type: LOGIN });
    const request = axios.post('http://localhost:5000/api/login', { email, password });
    request.then(function (response) {
        window.localStorage.setItem("auth", response.data.payload.auth);
        window.localStorage.setItem("userID", response.data.payload.userID);
        callback();
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.payload }); 
    })
        .catch(function (error) {
            dispatch({ type: LOGIN_FAILED, payload: error });
        });
};

export const getTopNine = (userID) => dispatch => {
 
    dispatch({ type: GET_TOP_NINE });
   return (axios.get(`http://localhost:5000/api/topnine/${ userID }`, {
        headers: {
            "authorization": window.localStorage.getItem('auth')
        }
    })
    .then(function (response) {
       
        dispatch({ type: GET_TOP_NINE_SUCCESS, payload: response.data });
    })
        .catch(function (error) {
            dispatch({ type: GET_TOP_NINE_FAILED, payload: error });
        }));
};