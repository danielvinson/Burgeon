import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux'
import { init, dispatch } from '@rematch/core'

import createHistory from 'history/createBrowserHistory'

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
//import TestLayout from './containers/TestLayout/TestLayout';
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
            {/*<Header />*/}
            {/*<Menu />*/}
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/settings" component={UserSettings} />
              <Route path="/track/:id" component={TrackDetail} />
              <Route path="/goal/:id" component={GoalDetail} />
              {/*<Route path="/test/:id" component={TestLayout} />*/}
              <Route path="/test2/:id" component={TestLayout2} />
            </div>
            {/*<Footer />*/}
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
