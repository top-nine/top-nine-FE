import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import {  withRouter, BrowserRouter as Router } from "react-router-dom";
import topNineReducer from "./reducers";

const store = createStore(topNineReducer, applyMiddleware(thunk, logger));
const AppWithRouter = withRouter(App);

ReactDOM.render(
  <Provider store={store}>
    <Router>
     <AppWithRouter />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
