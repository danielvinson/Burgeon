import React, { Component } from 'react';

import DropDownMenu from '../../components/DropDownMenu.js';
import Icon from '../../components/Icons.js';

import './NotificationsMenu.css';

const NotificationsMenu = props => {
    return(
      <DropDownMenu 
        className="notificationsMenu"
        visible = {props.visible}
        updateVisibility = {props.updateVisibility}
      >
        <div className="notificationsMenuItem">
          <div>Notification 1</div>
          <Icon icon="x" width={12} />
        </div>
        <div className="notificationsMenuItem">
          <div>Notification 2</div>
          <Icon icon="x" width={12} />
        </div>
        <div className="notificationsMenuItem">
          <div>Notification 3</div>
          <Icon icon="x" width={12} />
        </div>
      </DropDownMenu>
    );
};

export default NotificationsMenu;