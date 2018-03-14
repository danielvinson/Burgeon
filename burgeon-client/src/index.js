import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './base.css';

import Header from './containers/Header/Header';
import Menu from './containers/Menu/Menu';
import Footer from './containers/Footer/Footer';

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';

const Burgeon = () => (
    <Router>
        <React.Fragment>
            <Header />
            <Menu />
            <div className="content">
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
            <Footer />
        </React.Fragment>
    </Router>
)

ReactDOM.render(
    <Burgeon />,
    document.getElementById('reactContainer')
);