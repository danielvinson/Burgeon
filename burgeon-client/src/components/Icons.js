import React, { Component } from 'react';
import octicons from 'octicons';

import './Icons.css';


class Icon extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const svg = octicons[this.props.icon].toSVG({ width: this.props.width || octicons[this.props.icon].width });
    return(
        <div 
            className={`icon ${this.props.name}`}
            dangerouslySetInnerHTML={{ __html: svg }} 
        />
    )
  }
}

class Gear extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const gearSVG = octicons.gear.toSVG({ width: this.props.width || octicons.gear.width });
    
    return(
        <div 
            className="icon Gear"
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
            className="icon Bell"
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
            className="icon Flame"
            dangerouslySetInnerHTML={{ __html: flameSVG }} 
        />
    )
  }
}



export {
    Icon,
    Gear,
    Bell,
    Flame
} 