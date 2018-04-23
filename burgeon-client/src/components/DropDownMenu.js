import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './DropDownMenu.css';

class DropDownMenu extends Component {
  /*
  //  Reusable DropDown Menu Component
  */
  constructor(props) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.updateVisibility(false);
    }
  }

  render() {
    return (
        <div className="DropDownMenu" ref={this.setWrapperRef}>
          {this.props.visible &&
            <div className={`DropDownMenuContainer ${this.props.className}`}>
                {this.props.children}
            </div>
          }
        </div>
    );
  }
}

DropDownMenu.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array,
  visible: PropTypes.bool,
  updateVisibility: PropTypes.func
};

export default DropDownMenu;