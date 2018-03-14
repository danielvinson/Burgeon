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
          <div className="menuContainer">
            <div className="menuItem">
              <Link to="/">Home</Link>
            </div>
            <div className="menuItem">
              <Link to="/login">Login</Link>
            </div>
            <div className="menuItem">
              <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
    )
  }
}