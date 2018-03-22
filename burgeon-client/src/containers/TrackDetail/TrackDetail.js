import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import './TrackDetail.css';

class TrackDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackId: null,
      goalNameInput: '',
    };
  }

  componentWillMount() {
    const trackId = this.props.match.params.id;
    this.props.reloadTrack({'track_id': trackId}).then(() => {
      this.setState({
        trackId: trackId
      });
    });
  }

  handleGoalNameInput(event) {
    this.setState({
      goalNameInput: event.target.value
    });
  }

  handleAddGoal(event) {
    const goalName = this.state.goalNameInput;
    this.props.createGoal({
      name: goalName,
      track_id: this.state.trackId
    });
  }

  render() {
    const currentTrack = this.props.tracks[this.state.trackId];
    let goalElements = '';
    if (currentTrack){
      goalElements = Object.keys(currentTrack['goals']).map((key) => {
        const goal = currentTrack['goals'][key];
        
        // Calculate track/goal completion...
        let numTasks = 0;
        let numTasksComplete = 0;
        let goalCompletionPercent = 0;
        
        for (let task in goal['tasks']){
          const task = goal['tasks'][task];
          numTasks += 1;
          if (task['complete'] === true){
            numTasksComplete += 1;
          }
        }

        if (numTasks != 0){
          goalCompletionPercent = (numTasksComplete / numTasks) * 100;
        }
        
        return (
          <Link to={"/goal/" + goal.id}>
            <div 
              className="goalContainer" 
              key={goal.id}
              style={{
                'backgroundSize': `${goalCompletionPercent}% 100%`
              }}
            >
                <div className="goalInfo">
                    <span>{goal.name}</span>
                </div>
                <div className="goalCompletion">
                    <span>{goalCompletionPercent}%</span>
                    <span>Tasks: {numTasksComplete}/{numTasks}</span>
                </div>
            </div>
          </Link>
        )
      });
    }

    return (
      <div className="TrackDetail">
          <div>
            {goalElements}
          </div>
          <div>
            <input type="text" value={this.state.goalNameInput} onChange={this.handleGoalNameInput} />
            <button onClick={this.handleAddGoal}>Add Goal</button>
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
  reloadTrack: data => dispatch.tracks.reloadTrack(data),
  createGoal: data => dispatch.goals.createGoal(data),
});

export default connect(mapState, mapDispatch)(TrackDetail);