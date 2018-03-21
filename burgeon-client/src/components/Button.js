import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Button.css';

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
    
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.setState({isLoading: true}, async () => {
      await this.props.onClick();
      this.setState({isLoading: false});
    });
  }

  render() {
    const loadingStatus = this.state.isLoading ? ' loading' : 'notloading';
    return (
      <div 
        className={`Button ${this.props.wrapperClassName || ''} ${loadingStatus}`} 
        onClick={this.handleButtonClick}
        style={{width: `${this.props.width}`, height: `${this.props.height}`}}
      >
        <div className={`buttonWrapper`}>
          <span 
            className={`buttonContent ${this.props.buttonClassName || ''}`} 
            style={{ background: `${this.props.background}`, color: `${this.props.color}`}}
          >
            {this.props.children}
          </span>
          <span className="buttonProgressBar" style={{ background: `${this.props.progressBarColor}`}}>
            <span className="buttonProgressBarInner" style={{transition: `width ${this.props.progressBarTime || 2000}ms`}}></span>
          </span>
        </div>
      </div>
    )
  }
}

Button.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  background: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  progressBarEnable: PropTypes.bool,
  progressBarTime: PropTypes.number,
  progressBarColor: PropTypes.string,
  buttonClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
}

export default Button