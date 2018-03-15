import React, { Component } from 'react';
import { dispatch } from '@rematch/core'

import burgeonAPI from '../../api.js';

import './Login.css';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmitLogin(event) {
    event.preventDefault();
    
    dispatch.user.login({
      'email': this.state.email, 
      'password': this.state.password, 
      'rememberMe': this.state.rememberMe
    });
  }

  render() {
    return (
      <div className="Login">
        <div className="loginContainer">
          <form className="loginForm" onSubmit={this.handleSubmitLogin}>
            <div className="formGroup">
              <label>Email</label>
              <input
                autoFocus
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="formGroup">
              <label>Password</label>
              <input
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="formGroup">
              <label>Remember Me</label>
              <input
                name="rememberMe"
                type="checkbox"
                checked={this.state.rememberMe}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="formGroup">
              <button
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}