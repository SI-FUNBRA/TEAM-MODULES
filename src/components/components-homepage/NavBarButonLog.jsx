import classNames from 'classnames'
import { Menu } from 'primereact/menu'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router';
import { ServicioUsu } from '../../service/ServicioUsu';

const NavBarButonLog = () => {
    const menu = useRef(null);
    const history = new useHistory()


    const [infoTopBar, setInfoTopBar] = useState({
        roles:[]
    })

    useEffect(() => {
        const serviUsu = new ServicioUsu()

        serviUsu.getUsertopbar().then(res=>{
            setInfoTopBar(res.data)
        })

    }, [])

    const redireccionar = (ruta) =>{
        history.push(ruta)
    }

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        redireccionar('/')
        window.location.reload()
    }

    const overlayMenuItems = [

        {

            label: infoTopBar.nombre,

            items:[
            {
                label:"Dashboard",
                icon: 'pi pi-briefcase',
                command:()=>redireccionar('/dash/')
            },
            {
                label:"Perfil",
                icon: 'pi pi-cog',
                command:()=>redireccionar('/dash/perfil')
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

        <div className={classNames("layout-topbar-menu lg:flex origin-top")}>

            <Menu className="mt-1" ref={menu} model={overlayMenuItems} popup />

            <button className="p-link perfil" onClick={toggleMenu}>
                <i className="pi pi-user px-2"/>
                <span className="pl-2 pr-3">{infoTopBar.nombre}</span>
            </button>

        </div>
    )
}

export default NavBarButonLog
