import React, { Component } from 'react';
import { dispatch } from '@rematch/core'

import burgeonAPI from '../../api.js';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    
    this.handleAddPoints = this.handleAddPoints.bind(this);
  }
  
  handleAddPoints(event) {
    event.preventDefault();
    
    burgeonAPI.addPoints(5);
  }
  
  handleAddAlert(event) {
    event.preventDefault();
    
    dispatch.alerts.create({
      type: 'info', 
      message: 'Alert Message'
    });
  }
  
  render() {
    
    return(
        <div>
          <button onClick={this.handleAddPoints}>Add 5 Points</button>
          <button onClick={this.handleAddAlert}>Add an Alert</button>
        </div>
    )
  }
}