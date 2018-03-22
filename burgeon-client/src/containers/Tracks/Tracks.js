import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import burgeonAPI from '../../api.js';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import './Tracks.css';

class Tracks extends Component {
  constructor(props) {
    super(props);

    this.state = {
        trackNameInput: '',
    };
    
    this.handleTrackNameInput = this.handleTrackNameInput.bind(this);
    this.handleAddTrack = this.handleAddTrack.bind(this);
  }
  
  componentWillMount() {
    this.props.reloadTracks();
  }
  
  handleTrackNameInput(event) {
      this.setState({ trackNameInput: event.target.value });
  }
  
  handleAddTrack(type) {
    const trackName = this.state.trackNameInput;
    this.props.createTrack({
      name: trackName,
      user_id: this.props.user.user_id
    });
  }
  
  render() {

    const trackElements = Object.keys(this.props.tracks).map((key) => {
        const track = this.props.tracks[key];
        return (
            <div className="trackContainer" key={track.id}>
                <div className="trackInfo">
                    <span>Name: {track.name}</span>
                    <span>Goals: {track.goals}</span>
                </div>
                <div className="trackCompletion">
                    <span>100%</span>
                    <span>8/8</span>
                </div>
                
            </div>
        )
    });
    
    return(
        <div className="Tracks">
          <div>
            {trackElements}
          </div>
          <div>
            <input type="text" value={this.state.trackNameInput} onChange={this.handleTrackNameInput} />
            <button onClick={this.handleAddTrack}>Add Track</button>
          </div>
        </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  tracks: state.tracks,
});

const mapDispatch = dispatch => ({
  reloadTracks: () => dispatch.tracks.reloadTracks(),
  createTrack: data => dispatch.tracks.createTrack(data),
  updateTrack: data => dispatch.tracks.updateTrack(data),
  deleteTrack: data => dispatch.tracks.deleteTrack(data),
});

export default connect(mapState, mapDispatch)(Tracks);