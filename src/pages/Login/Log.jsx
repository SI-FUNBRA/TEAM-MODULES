import React from 'react'
import { Route, Switch } from 'react-router'
import Login from '../../components/componentsLog/Login'
import Register from '../../components/componentsLog/Register'

import './Log.css'

const Log = () => {
    return (
        <div className="p-d-inline-flex">

            <img className="imgFondo1" src={'assets/demo/images/log/conejo.jpg'} alt="fondo" />
            <img className="imgFondo2" src={'assets/demo/images/log/conejo.jpg'} alt="fondo" />

            <Switch>
                <Route exact path="/log/login">
                    <Login />
                </Route>
                <Route exact path="/log/register">
                    <Register />
                </Route>
            </Switch>
        </div>
    )
}

export default Log
