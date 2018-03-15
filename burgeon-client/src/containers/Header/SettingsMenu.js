import React, { Component } from 'react';
import { dispatch } from '@rematch/core'
import { connect } from 'react-redux'

import DropDownMenu from '../../components/DropDownMenu.js';

import './SettingsMenu.css';

class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  
  handleLogOut(event) {
    event.preventDefault();
    
    // redirect home
    dispatch.user.logout().then(() => {
      window.location.reload();
    })
  }

  render() {
    return(
      <div>
        {this.props.visible ? (
          <DropDownMenu className="settingsMenu">
            <div className="settingsMenuItem">
              <div>Welcome, {this.props.user.email || ''}</div>
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
    )
  }
}

const mapState = state => ({
  user: state.user
});

export default connect(mapState, null)(SettingsMenu);