import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import './GoalDetail.css';

class GoalDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackId: null,
      goalNameInput: '',
    };
    
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleTaskNameInput = this.handleTaskNameInput.bind(this);
    this.handleCompleteTask = this.handleCompleteTask.bind(this);
    
  }

  componentWillMount() {
    const goalId = this.props.match.params.id;
    this.props.reloadGoal({'goal_id': goalId}).then(() => {
      this.setState({
        goalId: goalId
      });
    });
  }

  handleTaskNameInput(event) {
    this.setState({
      taskNameInput: event.target.value
    });
  }

  handleAddTask(event) {
    const taskName = this.state.taskNameInput;
    this.props.createTask({
      name: taskName,
      goal_id: this.state.goalId
    }).then(() => {
      this.props.reloadGoal({'goal_id': this.state.goalId});
      this.setState({ taskNameInput: '' });
    });
  }
  
  handleCompleteTask(task_id) {
    this.props.updateTask({
        'task_id': task_id,
        'complete': 'True'
    }).then(() => {
        this.props.reloadGoal({'goal_id': this.state.goalId});
    });
  }

  render() {
    const currentGoal = this.props.goals[this.state.goalId];
    let taskElements = '';
    if (currentGoal){
      taskElements = Object.keys(currentGoal['tasks']).map((key) => {
        const task = currentGoal['tasks'][key];
        console.log(task);
        return (
            <div key={task.id}>
              {/*<Link to={"/task/" + task.id} className="taskLink">*/}
                <div className="taskContainer" key={task.id}>
                    <div className="taskInfo">
                        <span>{task.name}</span>
                        <span>{task.complete ? 'Complete' : 'Not Complete'}</span>
                    </div>
                    <div className="markAsComplete">
                        <button onClick={() => {this.handleCompleteTask(task.id)}}>Mark as Complete</button>
                    </div>
                </div>
              {/*</Link>*/}
            </div>
        )
      });
    }

    return (
      <div className="GoalDetail">
          <div>
            {taskElements}
          </div>
          <div>
            <input type="text" value={this.state.taskNameInput} onChange={this.handleTaskNameInput} />
            <button onClick={this.handleAddTask}>Add Task</button>
          </div>
        </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  goals: state.goals,
});

const mapDispatch = dispatch => ({
  reloadGoal: data => dispatch.goals.reloadGoal(data),
  createTask: data => dispatch.tasks.createTask(data),
  updateTask: data => dispatch.tasks.updateTask(data)
});

export default connect(mapState, mapDispatch)(GoalDetail);