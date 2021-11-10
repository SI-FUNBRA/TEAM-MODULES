import React, { useEffect, useRef, useState }  from 'react';
import { useHistory,Link } from 'react-router-dom';
import classNames from 'classnames';
import { Menu } from 'primereact/menu';

import './DashTopbar.css'
import { ServicioUsu } from './service/ServicioUsu';

export const DashTopbar = (props) => {

    const history = new useHistory()


    const [infoTopBar, setInfoTopBar] = useState({
        nombre:''
    })
    useEffect(() => {
        const serviUsu = new ServicioUsu()

        serviUsu.getUsertopbar().then(res=>{
            console.log(res.data)
            setInfoTopBar(res.data)
        })

    }, [])

    const menu = useRef(null);

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        history.push("/log/login")
    }

    const overlayMenuItems = [

        {

            label: infoTopBar.nombre,

            items:[

            {
                label:"Administrador",
                icon: 'pi pi-refresh'
            },
            {
                label:"Perfil",
                icon: 'pi pi-cog'
            }
        ]
        },

        {
            separator: true
        },
        {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: cerrarSesion
        }
    ];

    const toggleMenu = (event) => {
        menu.current.toggle(event);
    };


    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={props.layoutColorMode === 'light' ? 'assets/layout/images/logolargo.png' : 'assets/layout/images/logolargo.png'} alt="logo"/>
            </Link>

            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={toggleMenu}>
                <i className="pi pi-user" />
            </button>

                <div className={classNames("layout-topbar-menu lg:flex origin-top")}>

                        <Menu className="mt-1" ref={menu} model={overlayMenuItems} popup />

                        <button className="p-link perfil" onClick={toggleMenu}>
                            <i className="pi pi-user px-2"/>
                            <span className="pl-2 pr-3">{infoTopBar.nombre}</span>
                        </button>

                </div>
        </div>
    );
}
