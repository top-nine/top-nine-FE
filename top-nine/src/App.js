import React from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import Login from './components/Login/login';
import Home from './components/Home/home';
import Private from './components/private';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route path='/login' render={(props) => <Login {...props}/>}/> 
        <Private path='/home' component={Home} />
        <Switch>
           <Redirect exact from='/' to ='/home' />
        </Switch>
      </div>
    );
  }
}

export default App;