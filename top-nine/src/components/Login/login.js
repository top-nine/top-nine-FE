import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { loginUser } from '../../actions';
import { connect } from 'react-redux';

import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      registerForm: false,
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  callback = () => {
    this.props.history.push('/home');
  }

  loginUser = event => {
    event.preventDefault();
    this.props.loginUser({
            email: this.state.email,
            password: this.state.password
          }, this.callback);
  }

  registerUser = event => {

  }

  registerClicked = event => {
    this.setState({registerForm: true});
  }

registerForm(){
  return(
 
      <div className="login">
        <Form className="login-form">
          <Form.Label className='login-label'>Register</Form.Label>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={this.state.name}
              onChange={this.inputChanged}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              defaultValue={this.state.name}
              onChange={this.inputChanged}
            />
          </Form.Group>
 

          <Button variant="primary" type="submit" onClick={this.loginUser}>
            Log In
          </Button>

          <Button variant="register" onClick={ this.register }>
            Register
          </Button>
        </Form>
 
      </div>
  );
}
  loginForm(){
    return(
      <div className="login">
        <Form className="login-form">
          <Form.Label className='login-label'>Log In</Form.Label>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={this.state.name}
              onChange={this.inputChanged}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              defaultValue={this.state.name}
              onChange={this.inputChanged}
            />
          </Form.Group>
 

          <Button variant="primary" type="submit" onClick={this.loginUser}>
            Log In
          </Button>

          <Button variant="register" onClick={ this.registerClicked }>
            Register
          </Button>
        </Form>
 
      </div>
    );
  }
  render() {

   if ( localStorage.getItem("auth"))
   return (<Redirect from='/login' to ='/home' />);
  
      if (this.state.registerForm)
        return(this.registerForm());
      else
        return(this.loginForm());
  }
}
export default connect(null, { loginUser })(Login)