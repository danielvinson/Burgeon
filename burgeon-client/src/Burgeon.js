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

export default class Burgeon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    // Initialize login state
  }
  
  render() {
    return(
      <React.Fragment>
        <Alerts />
        <Header />
        <Menu />
        <div className="content">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </div>
        <Footer />
      </React.Fragment>
    )
  }
}