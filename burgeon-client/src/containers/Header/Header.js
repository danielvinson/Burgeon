import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';

import burgeonAPI from '../../api.js';

import DropDownMenu from '../../components/DropDownMenu.js';
import { Gear, Bell, Flame } from '../../components/Icons.js';

import './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      settingsMenuVisible: false,
      notificationsMenuVisible: false,
    };
    
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }
  
  componentWillMount() {
    burgeonAPI.getUser().then((response) => this.setState({ user: response.data }));
  }
  
  handleIconClick(event) {
    const icon = event.currentTarget.className.split(' ')[1];
    
    let settingsMenuVisible = this.state.settingsMenuVisible;
    let notificationsMenuVisible = this.state.notificationsMenuVisible;
    
    if (icon == 'gear'){
      settingsMenuVisible = !settingsMenuVisible;
      notificationsMenuVisible = false;
    }
    if (icon == 'bell'){
      settingsMenuVisible = false;
      notificationsMenuVisible = !notificationsMenuVisible;
    }
    
    this.setState({
      settingsMenuVisible: settingsMenuVisible,
      notificationsMenuVisible: notificationsMenuVisible,
    });
  }
  
  handleLogOut(event) {
    event.preventDefault();
    
    // redirect home
    burgeonAPI.logout().then((response) => {
      this.props.history.push('/');
      window.location.reload();
    })
  }
  
  render() {
    
    const loggedIn = this.state.user && this.state.user.status != 'fail';

    return(
      <div className="Header">
        <div className="headerContainer">
          <div className="title">
            <Link to="/">Burgeon</Link>
          </div>
          {loggedIn ? (
            <div className="profile loggedIn">
              <div className="profileIconGroup bell" onClick={this.handleIconClick}>
                <Bell width={24} />
                <div className="profileNotificationsMenu">
                  {this.state.notificationsMenuVisible ? (
                  <DropDownMenu className="notificationsMenu">
                    <div className="notificationsMenuItem">
                      <div>Notification 1</div>
                    </div>
                    <div className="notificationsMenuItem">
                      <div>Notification 2</div>
                    </div>
                    <div className="notificationsMenuItem">
                      <div>Notification 3</div>
                    </div>
                  </DropDownMenu>
                  ) : null}
                </div>
              </div>
              <div className="profileIconGroup flame">
                <Flame width={24} />
                <div className="profilePoints">
                  {this.state.user.points}
                </div>
              </div>
              <div className="profileIconGroup gear" onClick={this.handleIconClick}>
                <Gear width={24} />
                <div className="profileSettingsMenu">
                  {this.state.settingsMenuVisible ? (
                  <DropDownMenu className="settingsMenu">
                    <div className="settingsMenuItem">
                      <div>Welcome, {this.state.user.email}</div>
                    </div>
                    <div className="settingsMenuItem">
                      <div>Menu Item</div>
                    </div>
                    <div className="settingsMenuItem">
                      <div onClick={this.handleLogOut}>Log Out</div>
                    </div>
                  </DropDownMenu>
                  ) : null}
                </div>
              </div>
            </div>
          ) : ( /* Not logged in */
            <div className="profile loggedOut">
              <div className="loggedOutMessage">You're not logged in!</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header);