import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import burgeonAPI from '../../api.js';

import DropDownMenu from '../../components/DropDownMenu.js';
import { Gear, Bell, Flame } from '../../components/Icons.js';

import './Header.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsMenuVisible: false,
      notificationsMenuVisible: false,
    };
    
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }
  render () {
    return (
      <div> </div>
    )
  }
}