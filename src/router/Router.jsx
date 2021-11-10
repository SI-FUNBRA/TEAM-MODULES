import React from 'react'
import Dashboard from '../dashBoard'
import Login from '../components/componentsLog/Login'

import {
  Switch,
  Route
} from "react-router-dom";

const Router = () => {




    return (
        <Switch>
            <Route path="/dash">
                <Dashboard/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
        </Switch>
    )
}

export default Router
