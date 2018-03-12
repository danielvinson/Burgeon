import React, { Component } from 'react';

import burgeonAPI from '../api.js';

import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }
  
  componentWillMount() {
    this.setState({ user: burgeonAPI.getUser() });
  }
  
  render() {
    
    const userString = JSON.stringify(this.state.user);
    
    return(
        <div>{userString}</div>
    )
  }
}