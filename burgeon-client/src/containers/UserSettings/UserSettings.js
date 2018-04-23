import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from '../../components/Icons.js';
import Button from '../../components/Button.js';

import './UserSettings.css';

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        emailInput: '',
        passwordInput: '',
        usernameInput: '',
        firstNameInput: '',
        lastNameInput: ''
    }
    
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleSubmitSettings = this.handleSubmitSettings.bind(this);
  }
  
  componentWillMount() {
      if (!(this.props.user.email)){
          this.props.refreshUser().then(() => {this.initFields()});
      } else {
          this.initFields();
      }
  }
  
  initFields() {
      this.setState({
        emailInput: this.props.user.email,
        passwordInput: '',
        usernameInput: this.props.user.username,
        firstNameInput: this.props.user.first_name,
        lastNameInput: this.props.user.last_name,
      });
  }
  
  handleTextInput(event) {
      this.setState({
          [event.target.name]: event.target.value
      });
  }
  
  async handleSubmitSettings() {
      const updateData = {};
      if (this.props.user.email != this.state.emailInput){
          updateData['email'] = this.state.emailInput;
      }
      if ((this.props.user.password != this.state.passwordInput) && this.state.passwordInput != ''){
          updateData['password'] = this.state.passwordInput;
      }
      if (this.props.user.username != this.state.usernameInput){
          updateData['username'] = this.state.usernameInput;
      }
      if (this.props.user.first_name != this.state.firstNameInput){
          updateData['first_name'] = this.state.firstNameInput;
      }
      if (this.props.user.last_name != this.state.lastNameInput){
          updateData['last_name'] = this.state.lastNameInput;
      }
      
    const success = await this.props.updateUserSettings(updateData);
    if (success){
      this.props.createAlert({'type': 'info', 'message': 'Settings updated!'});
    } else {
       this.setState({ error: 'Error'});
    }
  }
  
  render() {
      return(
        <div className="UserSettings">
            <div className="userSettingsContainer">
                <div className="contentTitle">Settings</div>
                <div className="userSettingsForm">
                    <div className="userSettingsFormGroup">
                        <label>Email</label>
                        <input
                            name="emailInput"
                            onChange={this.handleTextInput}
                            value={this.state.emailInput}
                        />
                    </div>
                    <div className="userSettingsFormGroup">
                        <label>Password</label>
                        <input
                            name="passwordInput"
                            onChange={this.handleTextInput}
                            value={this.state.passwordInput}
                        />
                    </div>
                    <div className="userSettingsFormGroup">
                        <label>Username</label>
                        <input
                            name="usernameInput"
                            onChange={this.handleTextInput}
                            value={this.state.usernameInput}
                        />
                    </div>
                    <div className="userSettingsFormGroup">
                        <label>First Name</label>
                        <input
                            name="firstNameInput"
                            onChange={this.handleTextInput}
                            value={this.state.firstNameInput}
                        />
                    </div>
                    <div className="userSettingsFormGroup">
                        <label>Last Name</label>
                        <input
                            name="lastNameInput"
                            onChange={this.handleTextInput}
                            value={this.state.lastNameInput}
                        />
                    </div>
                </div>
                <Button
                    onClick={this.handleSubmitSettings}
                    width={150}
                    height={35}
                    background={"var(--mid-green)"}
                    color={"var(--night-sky)"}
                    progressBarEnable={true}
                    progressBarTimer={1000}
                    progressBarColor={"var(--dark-green)"}
                >
                    Update Settings
                </Button>
            </div>
        </div>
      );
  }
}

const mapState = state => ({
  user: state.user
});

const mapDispatch = dispatch => ({
  refreshUser: () => dispatch.user.refresh(),
  updateUserSettings: data => dispatch.user.updateUserSettings(data),
  createAlert: data => dispatch.alerts.create(data),
});

export default connect(mapState, mapDispatch)(UserSettings);
