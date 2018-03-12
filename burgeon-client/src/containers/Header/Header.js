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
    
    const userString = JSON.stringify(this.state.user);
    
    return(
        <div className="Header">
          <div className="title">Burgeon</div>
          <div>{userString}</div>
        </div>
    )
  }
}