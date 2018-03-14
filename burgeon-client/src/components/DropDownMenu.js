import React, { Component } from 'react';

import './DropDownMenu.css';

export default class DropDownMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="DropDownMenu">
            <div className={`DropDownMenuContainer ${this.props.className}`}>
                {this.props.children}
            </div>
        </div>
    )
  }
}