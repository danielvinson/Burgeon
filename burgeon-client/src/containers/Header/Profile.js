import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import burgeonAPI from '../../api.js';

import NotificationsMenu from './NotificationsMenu.js';
import SettingsMenu from './SettingsMenu.js';

import { Gear, Bell, Flame } from '../../components/Icons.js';

import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsMenuVisible: false,
      notificationsMenuVisible: false,
    };
    
    this.handleIconClick = this.handleIconClick.bind(this);
    this.handleSettingsVisibilityUpdate = this.handleSettingsVisibilityUpdate.bind(this);
    this.handleNotificationsVisibilityUpdate = this.handleNotificationsVisibilityUpdate.bind(this);
  }
  
  handleIconClick(event) {
    const icon = event.currentTarget.className.split(' ')[1];
    
    let settingsMenuVisible = this.state.settingsMenuVisible;
    let notificationsMenuVisible = this.state.notificationsMenuVisible;
    
    if (icon == 'gear'){
      settingsMenuVisible = !settingsMenuVisible;
    }
    if (icon == 'bell'){
      notificationsMenuVisible = !notificationsMenuVisible;
    }
    
    this.setState({
      settingsMenuVisible: settingsMenuVisible,
      notificationsMenuVisible: notificationsMenuVisible,
    });
  }
  
  handleSettingsVisibilityUpdate(visible) {
    this.setState({
      'settingsMenuVisible': visible
    });
  }

  handleNotificationsVisibilityUpdate(visible) {
    this.setState({
      'notificationsMenuVisible': visible
    });
  }

  render () {
    const loggedIn = this.props.user.loggedIn || false;
    
    return (
      <div className="Profile">
        {loggedIn ? (
          <div className="profileContainer loggedIn">
            <div className="profileIconGroup bell" onClick={this.handleIconClick}>
              <Bell width={24} />
              <NotificationsMenu 
                visible={this.state.notificationsMenuVisible} 
                updateVisibility={this.handleNotificationsVisibilityUpdate} 
              />
            </div>
            <div className="profileIconGroup flame">
              <div className="profilePoints">
                {this.props.user.points}
              </div>
              <Flame width={12} />
            </div>
            <div className="profileIconGroup gear" onClick={this.handleIconClick}>
              <Gear width={24} />
              <SettingsMenu 
                visible={this.state.settingsMenuVisible} 
                updateVisibility={this.handleSettingsVisibilityUpdate} 
              />
            </div>
          </div>
        ) : (
          /* LoggedOut */
          <div className="profileContainer loggedOut">
            <div className="loggedOutMessage">You're not logged in!</div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
});

export default connect(mapState, null)(Profile);