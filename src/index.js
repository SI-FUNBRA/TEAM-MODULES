import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import DashBoard from './DashBoard'

import './service/axiosConfig'

//import * as serviceWorker from './serviceWorker';
import { HashRouter, Switch,Route } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import HomePage from './pages/Home/Homepage'
import Log from './pages/Login/Log';

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route path="/dash">
                    <DashBoard />
                </Route>
                <Route path="/log" >
                    <Log />

                </Route>
                <Route exact path="/" >
                    <HomePage />
                </Route>
            </Switch>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
