import React, { Component } from 'react';
import { dispatch } from '@rematch/core'

import burgeonAPI from '../../api.js';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import Tracks from '../../containers/Tracks/Tracks.js';

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
        <div className="Home">
          <Tracks />
        </div>
    )
  }
}