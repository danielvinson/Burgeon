import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
        
        // Calculate track/goal completion...
        let numGoals = 0;
        let numGoalsComplete = 0;
        let numTasks = 0;
        let numTasksComplete = 0;
        let trackCompletionPercent = 0;
        
        for (let goal in track['goals']){
          const goal = track['goals'][goal];
          numGoals += 1;
          let goalComplete = true;
          if (goal['tasks'].length == 0){
            goalComplete = false;
          }
          for (let task in goal['tasks']){
            const task = goal['tasks'][task];
            numTasks += 1;
            if (task['complete'] === true){
              numTasksComplete += 1;
            } else {
              goalComplete = false;
            }
          }
          if (goalComplete){
            numGoalsComplete += 1;
          }
        }
        
        if (numGoals != 0){
          trackCompletionPercent = (numGoalsComplete / numGoals) * 100;
        }
        
        return (
          <div key={track.id}>
            <Link to={"/track/" + track.id} className="trackLink">
              <div 
                className="trackContainer" 
                style={{
                  'backgroundSize': `${trackCompletionPercent}% 100%`
                }}
              >
                  <div className="trackInfo">
                      <span>{track.name}</span>
                  </div>
                  <div className="trackCompletion">
                      <span>{trackCompletionPercent}%</span>
                      <span>Goals: {numGoalsComplete}/{numGoals}</span>
                      <span>Tasks: {numTasksComplete}/{numTasks}</span>
                  </div>
              </div>
            </Link>
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