import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { dispatch } from '@rematch/core'

import Alerts from './containers/Alerts/Alerts';
import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';
import Footer from './containers/Footer/Footer';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import UserSettings from './containers/UserSettings/UserSettings';
import TrackDetail from './containers/TrackDetail/TrackDetail';
import GoalDetail from './containers/GoalDetail/GoalDetail';
import TestLayout from './containers/TestLayout/TestLayout';

export default class Burgeon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    // Initialize login state
    dispatch.user.refresh();
  }
  
  render() {
    return(
      <React.Fragment>
        <Alerts />
        <Header />
        {/*<Menu />*/}
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/settings" component={UserSettings} />
          <Route path="/track/:id" component={TrackDetail} />
          <Route path="/goal/:id" component={GoalDetail} />
          <Route path="/test" component={TestLayout} />
        </div>
        {/*<Footer />*/}
      </React.Fragment>
    )
  }
}