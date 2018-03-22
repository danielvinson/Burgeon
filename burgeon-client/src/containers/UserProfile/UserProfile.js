import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import './UserProfile.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
      return(
        <div>
        </div>
      )
  }
}

const mapState = state => ({
  user: state.user,
  tracks: state.tracks,
});

export default connect(mapState, null)(UserProfile);