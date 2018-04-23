import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux'
import { init, dispatch } from '@rematch/core'

import createHistory from 'history/createBrowserHistory'

import Alerts from './containers/Alerts/Alerts';
import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import UserSettings from './containers/UserSettings/UserSettings';
import TestLayout2 from './containers/TestLayout2/TestLayout2';

import * as models from './models'
import './base.css';

const store = init({
  models,
});

const history = createHistory();

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
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <React.Fragment>
            <Alerts />
            <div className="content">
              <Route exact path="/" component={Home} />
              
              {/* User */}
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/settings" component={UserSettings} />
              
              {/* Tracks */}
              <Route path="/track/:id" component={TestLayout2} />
              
            </div>
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export {
  Burgeon,
  history
}
