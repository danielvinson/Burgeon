import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './StyleButton.css';

class StyleButton extends Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }
  render() {
    let className = 'Notepad-styleButton';
    if (this.props.active) {
      className += ' Notepad-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

export default StyleButton