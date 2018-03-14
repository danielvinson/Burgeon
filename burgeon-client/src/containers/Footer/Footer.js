import React, { Component } from 'react';

import './Footer.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  
  render() {
    return(
      <div className="Footer">
        <div className="footerContainer">
          <div className="footerGroup">
            <div>© 2018 Daniel Vinson</div>
          </div>
        </div>
      </div>
    )
  }
}