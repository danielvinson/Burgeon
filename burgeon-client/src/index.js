import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './base.css';

import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

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