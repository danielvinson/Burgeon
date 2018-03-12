import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './base.css';

import Header from './containers/Header';
import Menu from './containers/Menu';

import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';

const Burgeon = () => (
    <Router>
        <React.Fragment>
            <Header />
            <Menu />
            
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </React.Fragment>
    </Router>
)

ReactDOM.render(
    <Burgeon />,
    document.getElementById('reactContainer')
);