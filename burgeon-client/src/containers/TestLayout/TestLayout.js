import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import find from 'lodash/find';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import Notepad from '../../containers/Notepad/Notepad.js';

import './TestLayout.css';

class TestLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackId: 1,
      selectedGoal: null,
      selectedTask: null,
      goalNameInput: '',
      taskNameInput: '',
    }

    this.handleGoalSelect = this.handleGoalSelect.bind(this);
    this.handleTaskSelect = this.handleTaskSelect.bind(this);
    this.handleGoalNameInput = this.handleGoalNameInput.bind(this);
    this.handleTaskNameInput = this.handleTaskNameInput.bind(this);
    this.handleAddGoal = this.handleAddGoal.bind(this);
    this.handleAddTask = this.handleAddTask.bind(this);
    
  }

  componentDidMount() {
    this.props.reloadTrack(this.state.trackId);
  }

  handleGoalSelect(goal_id) {
    this.setState({
      selectedGoal: goal_id
    });
  }

  handleTaskSelect(task_id) {
    this.setState({
      selectedTask: task_id
    });
  }

  handleGoalNameInput(event) {
    this.setState({
      goalNameInput: event.target.value
    });
  }

  handleTaskNameInput(event) {
    this.setState({
      taskNameInput: event.target.value
    });
  }

  handleAddGoal(event) {
    const goalName = this.state.goalNameInput;
    this.props.createGoal({
      name: goalName,
      track_id: this.state.trackId
    }).then(() => {
      this.props.reloadTrack({
        'track_id': this.state.trackId
      });
      this.setState({
        goalNameInput: ''
      });
    });
  }

  handleAddTask(event) {
    const taskName = this.state.taskNameInput;
    this.props.createTask({
      name: taskName,
      goal_id: this.state.goalId
    }).then(() => {
      this.props.reloadGoal({
        'goal_id': this.state.goalId
      });
      this.setState({
        taskNameInput: ''
      });
    });
  }

  handleCompleteTask(task_id) {
    this.props.updateTask({
      'task_id': task_id,
      'complete': 'True'
    }).then(() => {
      this.props.reloadGoal({
        'goal_id': this.state.goalId
      });
    });
  }

  render() {
    const track = find(this.props.tracks, {'id': this.state.trackId});
    
    let goalElements = <div></div>;
    if (track) {
      goalElements = Object.keys(track['goals']).map((index) => {
        const goal = track['goals'][index];
        
        //// Calculate track/goal completion...
        let numTasks = 0;
        let numTasksComplete = 0;
        let goalCompletionPercent = 0;
        for (let taskId in goal['tasks']) {
          const task = goal['tasks'][taskId];
          numTasks += 1;
          if (task['complete'] === true) {
            numTasksComplete += 1;
          }
        }
        if (numTasks != 0) {
          goalCompletionPercent = (numTasksComplete / numTasks) * 100;
        }
        //////////////////

        return (
          <div 
            className={goal.id == this.state.selectedGoal ? "goalItem selected" : "goalItem"} 
            key={goal.id} 
            onClick={() => this.handleGoalSelect(goal.id)}
          >
            <div className="goalItemName">{goal.name}</div>
            <div className="goalItemCompletion" style={{ width: `${goalCompletionPercent}%`}}></div>
          </div>
        )
      });
    }

    let taskElements = '';
    if (this.state.selectedGoal) {
      // selectedGoal is an id so we need to search the array for it...
      const selectedGoal = find(this.props.tracks[this.state.trackId]['goals'], {'id': this.state.selectedGoal});
      taskElements = Object.keys(selectedGoal['tasks']).map((index) => {
        const task = selectedGoal['tasks'][index];
        return (
          <div 
            className={task.id == this.state.selectedTask ? 'taskItem selected' : 'taskItem'} 
            key={task.id} 
            onClick={() => this.handleTaskSelect(task.id)}
          >
              <div className="taskItemName">{task.name}</div>
              <div className="taskItemIcon">
                {task.complete ? (
                  <Icon icon="check" width={16} />
                ) : (null)}
              </div>
          </div>
        )
      });
    }

    return (
      <div className="TestLayout">
        <div className="LayoutTitle">{this.state.trackId}</div>
        <div className="LayoutContent">
          <div className="goalsMenu">
            <div>
                {goalElements}
            </div>
            <div>
              <input type="text" value={this.state.goalNameInput} onChange={this.handleGoalNameInput} />
              <button onClick={this.handleAddGoal}>Add Goal</button>
            </div>
          </div>
          <div className="tasksMenu">
            <div>
                {taskElements}
            </div>
            <div>
              <input type="text" value={this.state.taskNameInput} onChange={this.handleTaskNameInput} />
              <button onClick={this.handleAddTask}>Add Task</button>
            </div>
          </div>
          <div className="notepad">
            <Notepad taskId={this.state.selectedTask} />
          </div>
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
  createAlert: data => dispatch.alerts.create(data),
  
  reloadTrack: id => dispatch.tracks.reloadTrack({'track_id': id}),
  
  reloadGoal: id => dispatch.goals.reloadGoal({'goal_id': id}),
  createGoal: data => dispatch.goals.createGoal(data),
  updateGoal: data => dispatch.goals.updateGoal(data),
  
  reloadTask: id => dispatch.goals.reloadTask({'task_id': id}),
  createTask: data => dispatch.tasks.createTask(data),
  updateTask: data => dispatch.tasks.updateTask(data)
});

export default connect(mapState, mapDispatch)(TestLayout);