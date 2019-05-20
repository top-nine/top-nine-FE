import React from "react";
import { Route } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import './login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  loginUser = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="login">
        <Form className="login-form">
          <Form.Label className='login-label'>Log In</Form.Label>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              placeholder="Email"
              name="username"
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
 

          <Button variant="primary" type="submit" onClick={this.buttonClicked}>
            Log In
          </Button>

          <Button variant="register" onClick={this.buttonClicked}>
            Register
          </Button>
        </Form>
 
      </div>
    );
  }
}
