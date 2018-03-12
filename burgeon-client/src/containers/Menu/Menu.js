import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './Menu.css';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  
  render() {
    
    return(
        <div className="Menu">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
    )
  }
}