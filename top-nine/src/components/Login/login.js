import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { loginUser, register, clearError } from "../../actions";
import { connect } from "react-redux";
import NavBar from "../NavBar/navbar";

import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      registerForm: false,   
    };
  }


  inputChanged = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  inputClear = () => {
 
    this.setState({
      name: "",
      email: "",
      password: "",
      password2: "",
    });
  }

  finish = () => {

    this.inputClear();
    
    let status = this.props.status;
  if (this.state.registerForm && status === 200) 
      this.setState({ registerForm: false });
    else 
    if (!this.state.registerForm) 
      this.props.history.push("/home");
  };

  loginUser = event => {
    event.stopPropagation();
    event.preventDefault();
    this.props
      .loginUser({
        email: this.state.email,
        password: this.state.password
      })
      .then(() => {
       
      }).then(() => {
        if (this.props.status === 200)
        this.finish();
      })
  };

  cancel = event => {
    event.preventDefault();
    this.inputClear();
    this.props.clearError();
    this.setState({ registerForm: false });
  };

  registerUser = event => {
    if (this.state.password === this.state.password2)
    {
      this.props
        .register({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        })
        .then(() => {
          this.finish();
        });
    }
  };

  registerClicked = event => {
    if (this.state.registerForm) 
      this.registerUser();
    else {
      this.props.clearError();
      this.inputClear();
      this.setState({ registerForm: true });
    }
  };

  registerForm() {

    let error =  this.state.password !== this.state.password2 ? 'Passwords do not match' : this.props.error;
     
    return (
      <div className="login">
        <NavBar isLogin={true} />
        <Form className="login-form">
          <Form.Label className="login-label">Register</Form.Label>
          <Form.Group >
          <Form.Label className='error-msg'>{error}</Form.Label>
          </Form.Group>
          {this.state.registerForm && (
            <Form.Group controlId="name">
              <Form.Control
                type="name"
                placeholder="Name"
                name="name"
                onChange={this.inputChanged}
              />
            </Form.Group>
          )}
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
          {this.state.registerForm && (
            <Form.Group controlId="password2">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password2"
                onChange={this.inputChanged}
              />
            </Form.Group>
          )}

          <Button className='login-button'
            variant={this.state.registerForm ? "cancel" : "primary"}
            onClick={this.cancel}
          >
            Cancel
          </Button>

          <Button className='login-button'
            variant={this.state.registerForm ? "primary" : "register"}
            onClick={this.registerClicked}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }

  loginForm() {

    let error =  this.props.status !== 200  && this.props.status !== 0 ? 'Please make sure login credentials are accurate' : '';
    console.log(this.props);
    return (
      <div className="login">
        <NavBar isLogin={true} />
        <Form className="login-form">
          
          <Form.Label className="login-label">Log In</Form.Label>
          <Form.Group >
          <Form.Label className='error-msg'>{error}</Form.Label>
          </Form.Group>
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

          <Button className='login-button' variant="primary" type="submit" onClick={this.loginUser}>
            Log In
          </Button>

          <Button className='login-button' variant="register" onClick={this.registerClicked}>
            Register
          </Button>
        </Form>
      </div>
    );
  }
 
  render() {
    if (localStorage.getItem("auth"))
      return <Redirect from="/login" to="/home" />;
 
    if (this.state.registerForm) 
      return this.registerForm();
    else 
      return this.loginForm();
  }
}

const mapStateToProps = state => {
  return {
   
    error: state.error,
    status: state.status,
  };
};

export default connect( mapStateToProps, { loginUser, register, clearError } )(Login);
