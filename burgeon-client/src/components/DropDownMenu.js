import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './DropDownMenu.css';

class DropDownMenu extends Component {
  /*
  //  Reusable DropDown Menu Component
  */
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

DropDownMenu.propTypes = {
  className: PropTypes.string
};

export default DropDownMenu