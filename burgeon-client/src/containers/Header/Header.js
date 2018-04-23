import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import burgeonAPI from '../../api.js';

import HeaderIcons from './HeaderIcons.js';

import './Header.css';

const Header = (props) => {
  return(
    <div className="Header">
      <div className="headerContainer">
        <div className="title">
          <Link to="/">Burgeon</Link>
        </div>
        <HeaderIcons />
      </div>
    </div>
  );
};

export default Header;