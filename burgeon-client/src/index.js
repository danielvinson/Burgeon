import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './base.css';

import Login from './containers/Login';

const Burgeon = () => (
    <Router>
        <React.Fragment>
            <div>Hi.</div>
            <Route exact path="/" component={Login} />
        </React.Fragment>
    </Router>
)

ReactDOM.render(
    <Burgeon />,
    document.getElementById('reactContainer')
);