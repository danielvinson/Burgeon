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
    this.handleAddAlert = this.handleAddAlert.bind(this);
  }
  
  handleAddPoints(event) {
    event.preventDefault();
    
    dispatch.user.addPoints(5);
  }
  
  handleAddAlert(type) {
    dispatch.alerts.create({
      type: type,
      message: type + ' Alert Message',
    });
  }
  
  render() {
    
    return(
        <div>
          <button onClick={this.handleAddPoints}>Add 5 Points</button>
          <button onClick={() => this.handleAddAlert('error')}>Add an Error Alert</button>
          <button onClick={() => this.handleAddAlert('warning')}>Add a Warning Alert</button>
          <button onClick={() => this.handleAddAlert('info')}>Add an Info Alert</button>
        </div>
    )
  }
}