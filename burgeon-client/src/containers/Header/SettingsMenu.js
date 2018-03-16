import React, { Component } from 'react';
import { dispatch } from '@rematch/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import DropDownMenu from '../../components/DropDownMenu.js';

import './SettingsMenu.css';

class SettingsMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.handleLogOut = this.handleLogOut.bind(this);
  }
  
  handleLogOut(event) {
    dispatch.user.logout();
  }

  render() {
    return(
      <div>
        {this.props.visible ? (
          <DropDownMenu className="settingsMenu">
            <div className="settingsMenuItemGroup">
              <div className="settingsMenuItem">
                <div>Welcome, {this.props.user.email || ''}</div>
              </div>
            </div>
            <div className="settingsMenuItemGroup">
              <div className="settingsMenuItem">
                <div>Menu Item</div>
              </div>
              <div className="settingsMenuItem">
                <div>Menu Item</div>
              </div>
              <div className="settingsMenuItem">
                <div>Menu Item</div>
              </div>
            </div>
            <div className="settingsMenuItemGroup">
              <div className="settingsMenuItem">
                <div onClick={this.handleLogOut}>Log Out</div>
              </div>
            </div>
          </DropDownMenu>
        ) : null}
      </div>
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