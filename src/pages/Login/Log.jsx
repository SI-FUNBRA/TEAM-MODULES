import { Toast } from 'primereact/toast'
import React, { useRef, useState } from 'react'
import { Route, Switch } from 'react-router'
import Login from '../../components/componentsLog/Login'
import Register from '../../components/componentsLog/Register'

import { Link } from 'react-router-dom';

import {FaHome} from 'react-icons/fa';
import {MdOutlineArrowBackIosNew} from 'react-icons/md';


import './Log.css'
import RecoverPass from '../../components/componentsLog/RecoverPass'
import ChangePass from '../../components/componentsLog/ChangePass'

const Log = () => {

    const toast = useRef(null);

    localStorage.removeItem('token')

    const [arrowShowItem, setArrowShowItem] = useState(false)

    const arrowShow = () =>{
        setArrowShowItem(true)
    }
    const arrowHide = () =>{
        setArrowShowItem(false)
    }

    return (
        <div className="layout-wrapper p-d-inline-flex">

            <img className="imgFondo1" src={'assets/demo/images/log/Nigga/hueco.png'} alt="fondo" />
            <img className="imgFondo2" src={'assets/demo/images/log/conejo.png'} alt="fondo" />

            <Link to='/' className="close" onMouseEnter={arrowShow} onMouseLeave={arrowHide} >{arrowShowItem && <MdOutlineArrowBackIosNew className="arrowClose" size={20} />}<FaHome size={30} /></Link>

            <Switch>
                <Route exact path="/log/login">
                    <Login toast={toast}/>
                </Route>
                <Route path="/log/register">
                    <Register toast={toast}/>
                </Route>
                <Route path="/log/RecuperarContraseña">
                    <RecoverPass toast={toast}/>
                </Route>
                <Route path="/log/olvidecontra/:tokenpass">
                    <ChangePass toast={toast}/>
                </Route>
            </Switch>
            <Toast ref={toast} position="bottom-right"/>

        </div>
    )
}

export default Log
