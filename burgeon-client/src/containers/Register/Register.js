import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import burgeonAPI from '../../api.js';

import './Register.css';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password2: ''
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmitRegistration(event) {
    event.preventDefault();
    
    if (this.state.password == this.state.password2){
      burgeonAPI.register(this.state.email, this.state.password);
    } else {
      console.log("Passwords do not match!");
    }
  }
  
  render() {
    return(
      <div className="Register">
        <div className="registerContainer">
          <div className="contentTitle">Register</div>
          <form onSubmit={this.handleSubmitRegistration}>
            <div className="formGroup registerFormGroup">
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
            <div className="formGroup registerFormGroup">
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
            <div className="formGroup registerFormGroup">
              <label className="formLabel">Verify Password</label>
              <input
                name="password2"
                type="password"
                placeholder="Verify Password"
                value={this.state.password2}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="formGroupInline registerFormGroupInline">
              <button
                type="submit"
                className="registerButton"
              >
                Register
              </button>
            </div>
          </form>
          <div className="regsiterLoginLink">
            Already have an Account?  <Link to="/login">Log In</Link>.
          </div>
        </div>
      </div>
    );
  }
}
