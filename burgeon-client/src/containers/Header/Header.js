import React, { Component } from 'react';

import burgeonAPI from '../../api.js';

import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }
  
  componentWillMount() {
    burgeonAPI.getUser().then((response) => this.setState({ user: response.data }));
  }
  
  render() {

    return(
      <div className="Header">
        <div className="headerItemContainer">
          <div className="title">Burgeon</div>
          <div className="profile">
            {this.state.user != {} ? (
            <div>Welcome, {this.state.user.email}</div>
            ) : (
            <div>You're not logged in!</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}