import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import { ConnectedRouter } from 'react-router-redux'

import createHistory from 'history/createBrowserHistory'

import { init } from '@rematch/core'


import Burgeon from './Burgeon';
import * as models from './models'
import './base.css';

const store = init({
  models,
});

const history = createHistory();

render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Burgeon />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('reactContainer')
);