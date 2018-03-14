import React, { Component } from 'react';

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
        <form onSubmit={this.handleSubmitRegistration}>
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
            <label>Verify Password</label>
            <input
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="formGroup">
            <button
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    )
  }
}