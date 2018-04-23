import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import NotificationsMenu from './NotificationsMenu.js';
import SettingsMenu from './SettingsMenu.js';

import Icon from '../../components/Icons.js';

import './HeaderIcons.css';

export class HeaderIcons extends Component {
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

    if (icon == 'gear'){
      this.handleSettingsVisibilityUpdate(!this.state.settingsMenuVisible);
    }
    if (icon == 'bell'){
      this.handleNotificationsVisibilityUpdate(!this.state.notificationsMenuVisible);
    }
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
    let loggedIn = false;
    if (this.props.user && this.props.user.loggedIn){
      loggedIn = true;
    }
    
    return (
      <div className="HeaderIcons">
        {loggedIn ? (
          <div className="profileContainer loggedIn">
            <div className="profileIconGroup bell" onClick={this.handleIconClick}>
              <Icon icon={'bell'} width={18} />
              <NotificationsMenu 
                visible={this.state.notificationsMenuVisible} 
                updateVisibility={this.handleNotificationsVisibilityUpdate} 
              />
            </div>
            <div className="profileIconGroup gear" onClick={this.handleIconClick}>
              <Icon icon='gear' width={22} />
              <SettingsMenu 
                visible={this.state.settingsMenuVisible} 
                updateVisibility={this.handleSettingsVisibilityUpdate} 
              />
            </div>
          </div>
        ) : (
          /* LoggedOut */
          <div className="profileContainer loggedOut">
            <div className="loggedOutMessage">
              <Link to="/login">Log In</Link> or <Link to="/register">Register</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(HeaderIcons);
