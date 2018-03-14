import React, { Component } from 'react';
import octicons from 'octicons';

import './Icons.css';

class Gear extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const gearSVG = octicons.gear.toSVG({ width: this.props.width || octicons.gear.width });
    
    return(
        <div 
            className="Gear"
            dangerouslySetInnerHTML={{ __html: gearSVG }} 
        />
    )
  }
}

class Bell extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const bellSVG = octicons.bell.toSVG({ width: this.props.width || octicons.bell.width });
    
    return(
        <div 
            className="Bell"
            dangerouslySetInnerHTML={{ __html: bellSVG }} 
        />
    )
  }
}

class Flame extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const flameSVG = octicons.flame.toSVG({ width: this.props.width || octicons.flame.width });
    
    return(
        <div 
            className="Flame"
            dangerouslySetInnerHTML={{ __html: flameSVG }} 
        />
    )
  }
}

export {
    Gear,
    Bell,
    Flame
} 