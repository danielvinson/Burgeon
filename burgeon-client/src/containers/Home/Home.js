import React, { Component } from 'react';

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
  
  render() {
    
    return(
        <div>
          <button onClick={this.handleAddPoints}>Add 5 Points</button>
        </div>
    )
  }
}