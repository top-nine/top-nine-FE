import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { loginUser, register } from '../../actions';
import { connect } from 'react-redux';

import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      email: "",
      password: "",
      password2:"",
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
    event.stopPropagation();
    event.preventDefault();
    this.props.loginUser({
            email: this.state.email,
            password: this.state.password
          }, this.callback);
  }

  cancel = event => {
 
     event.preventDefault();
    this.setState({registerForm: false});
  }

  registerUser = event => {
    if (this.state.password !== this.state.password2)
      alert('Passwords do not match!!!');
    else{
        this.props.register({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          }, this.callback);
    }
  }

  registerClicked = event => {
    
    if (this.state.registerForm)
      this.registerUser();
    else
      this.setState({registerForm: true});
  }

registerForm(){
  return(
 
      <div className="login">
        <Form className="login-form">
          <Form.Label className='login-label'>Register</Form.Label>
          {this.state.registerForm && 
            <Form.Group controlId="name">
            <Form.Control
              type="name"
              placeholder="Name"
              name="name"
              onChange={this.inputChanged}
            />
              </Form.Group>}
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              onChange={this.inputChanged}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.inputChanged}
            />
              </Form.Group>
            {this.state.registerForm && 
            <Form.Group controlId="password2">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password2"
              onChange={this.inputChanged}
            />
              </Form.Group>}
        
 

          <Button variant={this.state.registerForm ? "cancel" : "primary"} onClick={this.cancel}>
            Cancel
          </Button>

          <Button variant={this.state.registerForm ? "primary" : "register"} onClick={ this.registerClicked }>
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
export default connect(null, { loginUser, register })(Login)