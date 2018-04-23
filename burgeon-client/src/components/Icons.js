import React, { Component } from 'react';
import octicons from 'octicons';
import PropTypes from 'prop-types';

import './Icons.css';

class Icon extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const svg = octicons[this.props.icon].toSVG({ width: this.props.width || octicons[this.props.icon].width });
    return(
        <div 
            className={`icon ${this.props.icon}-icon`}
            dangerouslySetInnerHTML={{ __html: svg }} 
        />
    );
  }
}

Icon.propTypes = {
  icon: PropTypes.string,
  width: PropTypes.number,
};

export default Icon;
