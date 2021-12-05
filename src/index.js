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
import DonacionEconomica from './pages/Donacion/Donaciones';
import DonacionEspecie from './pages/Donacion/DonacionesEspecie';
import ListDonEcon from './components/components-donaciones/donacionEconomica/ListDonEcon';
import ListDonEsp from './components/components-donaciones/donacionEspecie/ListSolDonEsp'
import Catalog from './pages/Catalog/Catalogoss';

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
                {/* Donaciones */}
                <Route path="/donacionEconomica/listDonEsp">
                    <ListDonEsp />
                </Route>
                <Route path="/donacionEconomica/listDonEcon">
                    <ListDonEcon />
                </Route>
                <Route path="/donacionEconomica">
                    <DonacionEconomica />
                </Route>
                <Route path="/donacionEspecie">
                    <DonacionEspecie />
                </Route>
                {/* Fin Donaciones */}
                <Route exact path="/" >
                    <HomePage />
                </Route>
                <Route exact path="/catalogoAnimales" component>
                    <Catalog />
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
