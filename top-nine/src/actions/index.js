import axios from 'axios';

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginUser = (cred, callback) => dispatch => {
    const { email, password } = cred;
    dispatch({ type: LOGIN });
    const request = axios.post('http://localhost:5000/api/login', { email, password });
    request.then(function (response) {
        window.localStorage.setItem("auth", response.data.payload);
        callback();
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.payload }); 
    })
        .catch(function (error) {
            dispatch({ type: LOGIN_FAILED, payload: error });
        });
};

