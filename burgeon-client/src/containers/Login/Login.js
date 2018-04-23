import React, { Component } from 'react';
import { dispatch } from '@rematch/core';
import { Link } from 'react-router-dom';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      error: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  validateEmail() {
    return this.state.email.length > 0 && 
           this.state.email.includes('@') &&
           this.state.email.includes('.');
  }
  
  validatePassword() {
    return this.state.password.length > 5;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmitLogin() {
    const success = await dispatch.user.login({
      'email': this.state.email, 
      'password': this.state.password, 
      'rememberMe': this.state.rememberMe
    });
    if (success){
      this.props.history.push('/');
    } else {
       this.setState({ error: 'Invalid Username or Password'});
    }
  }

  render() {

    const validEmail = this.validateEmail();
    const validPassword = this.validatePassword();
    
    return (
      <div className="Login">
        <div className="loginContainer">
          <div className="contentTitle">Log In</div>
          <form className="loginForm">
            <div className="formGroup loginFormGroup">
              <label className="formLabel">Email</label>
              <input
                autoFocus
                name="email"
                type="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="formGroup loginFormGroup">
              <label className="formLabel">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="formGroupInline loginFormGroupInline">
              <label className="formLabel">Remember Me?</label>
              <input
                name="rememberMe"
                type="checkbox"
                checked={this.state.rememberMe}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="formGroupInline loginFormGroupInline">
              <Button
                onClick={this.handleSubmitLogin}
                width={150}
                height={35}
                background={"var(--mid-green)"}
                color={"var(--night-sky)"}
                progressBarEnable={true}
                progressBarTimer={1000}
                progressBarColor={"var(--dark-green)"}
              >
                Log In
              </Button>
            </div>
            <div className="formGroupInline loginFormGroupInline">
              <div className="loginFormError">{this.state.error}</div>
            </div>
          </form>
          <div className="loginRegister">
            Don't have an Account?  <Link to="/register">Join up</Link>.
          </div>
        </div>
      </div>
    );
  }
}
