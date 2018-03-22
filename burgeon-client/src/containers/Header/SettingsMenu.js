import React, { Component } from 'react';
import { dispatch } from '@rematch/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../index.js';
import DropDownMenu from '../../components/DropDownMenu.js';

import './SettingsMenu.css';

class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  
  async handleLogOut(event) {
    await dispatch.user.logout();
    history.push('/');
  }

  render() {
    return(
      <React.Fragment>
        {this.props.visible ? (
          <DropDownMenu 
            className="settingsMenu"
            visible={this.props.visible}
            updateVisibility={this.props.updateVisibility}
          >
            <div className="settingsMenuItemGroup">
              <div className="settingsMenuItem">
                <div>Welcome, {this.props.user.email || ''}</div>
              </div>
            </div>
            <div className="settingsMenuItemGroup">
              <div className="settingsMenuItem">
                <div><Link to="/settings">Settings</Link></div>
              </div>
              <div className="settingsMenuItem">
                <div><Link to="/profile">View Your Profile</Link></div>
              </div>
            </div>
            <div className="settingsMenuItemGroup">
              <div className="settingsMenuItem">
                <div onClick={this.handleLogOut}>Log Out</div>
              </div>
            </div>
          </DropDownMenu>
        ) : null}
      </React.Fragment>
    )
  }
}

SettingsMenu.propTypes = {
  visible: PropTypes.bool
};

const mapState = state => ({
  user: state.user
});

export default connect(mapState, null)(SettingsMenu);