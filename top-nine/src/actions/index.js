import axios from 'axios';

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const loginuser = (cred, callback) => dispatch => {
    const { username, password } = cred;
    dispatch({ type: LOGIN });
    const request = axios.post('http://localhost:5000/api/login', { username, password });
    request.then(function (response) {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.payload });
    })
        .catch(function (error) {
            dispatch({ type: LOGIN_FAILED, payload: error });
        });
};

