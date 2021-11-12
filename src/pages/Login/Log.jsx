import { Toast } from 'primereact/toast'
import React, { useRef } from 'react'
import { Route, Switch } from 'react-router'
import Login from '../../components/componentsLog/Login'
import Register from '../../components/componentsLog/Register'

import { Link } from 'react-router-dom';

import {AiOutlineClose} from 'react-icons/ai';


import './Log.css'

const Log = () => {

    const toast = useRef(null);

    localStorage.removeItem('token')

    return (
        <div className="layout-wrapper p-d-inline-flex">

            <img className="imgFondo1" src={'assets/demo/images/log/Nigga/hueco.png'} alt="fondo" />
            <img className="imgFondo2" src={'assets/demo/images/log/conejo.png'} alt="fondo" />

            <Link to='/' className="close"><AiOutlineClose size={30} /></Link>

            <Switch>
                <Route exact path="/log/login">
                    <Login toast={toast}/>
                </Route>
                <Route path="/log/register">
                    <Register toast={toast}/>
                </Route>
            </Switch>
            <Toast ref={toast} position="bottom-right"/>

        </div>
    )
}

export default Log
