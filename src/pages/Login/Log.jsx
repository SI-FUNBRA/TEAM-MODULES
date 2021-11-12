import React from 'react'
import { Route, Switch } from 'react-router'
import Login from '../../components/componentsLog/Login'
import Register from '../../components/componentsLog/Register'
import Pruebar from '../../components/componentsLog/Pruebar'

import { Link } from 'react-router-dom';

import {AiOutlineClose} from 'react-icons/ai';


import './Log.css'

const Log = () => {

    localStorage.removeItem('token')

    return (
        <div className="layout-wrapper p-d-inline-flex">

            <img className="imgFondo1" src={'assets/demo/images/log/blanquito/hueco.png'} alt="fondo" />
            <img className="imgFondo2" src={'assets/demo/images/log/conejo.png'} alt="fondo" />

            <Link to='/' className="close"><AiOutlineClose size={30} /></Link>

            <Switch>
                <Route exact path="/log/login">
                    <Login />
                </Route>
                <Route path="/log/register">
                    <Register />
                </Route>
                <Route path="/log/register2">
                    <Pruebar />
                </Route>
            </Switch>
        </div>
    )
}

export default Log
