import React, { Component } from 'react';

import DropDownMenu from '../../components/DropDownMenu.js';

import './NotificationsMenu.css';

const NotificationsMenu = props => {
    return(
        <div>
            {props.visible ? (
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
    )
}

export default NotificationsMenu