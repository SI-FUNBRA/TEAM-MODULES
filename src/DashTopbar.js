import React, { useEffect, useRef, useState }  from 'react';
import { useHistory,Link } from 'react-router-dom';
import classNames from 'classnames';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import './DashTopbar.css'
import { ServicioUsu } from './service/ServicioUsu';
import { Button } from 'primereact/button';
import { ServicioCredencial } from './service/ServicioCredencial';

export const DashTopbar = (props) => {
    const history = new useHistory()

    const [infoTopBar, setInfoTopBar] = useState({
        roles:[]
    })
    const [dialogRoles, setDialogRoles] = useState(false)
    useEffect(() => {
        const serviUsu = new ServicioUsu()

        serviUsu.getUsertopbar().then(res=>{
            setInfoTopBar(res.data)
        })

    }, [])

    const serviCredencial = new ServicioCredencial()

    const showDialogRoles = () =>{
        setDialogRoles(true)
    }
    const hideDialogRoles = () =>{
        setDialogRoles(false)
    }

    const menu = useRef(null);

    const cerrarSesion = () =>{
        localStorage.removeItem('token')
        history.push("/log/login")
    }

    const redireccionar = (ruta) =>{
        history.push(ruta)
    }

    const rolLabel = (idRol) =>{
        switch (idRol) {
            case 1:
                return "Administrador"
            case 2:
                return "Gerente"

            default:
                return "Participante"

        }
    }

    const overlayMenuItems = [

        {

            label: infoTopBar.nombre,

            items:[

            {
                label:rolLabel(infoTopBar.Rol),
                icon: 'pi pi-refresh',
                command:showDialogRoles
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

    const rolChange = (idRol) =>{
        serviCredencial.ChangeRol({rolChange:idRol}).then(res=>{
            console.log(res.data.success)
            localStorage.setItem('token', res.data.success)
            window.location.reload();
        }).catch(()=>{})
    }

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

                <Dialog className="col-10 md:col-6 xl:col-5" position="top" visible={dialogRoles} header="Selecciona El Rol" modal onHide={hideDialogRoles}>
                        <div className="text-center d-none d-xl-block">
                            <Button onClick={()=>rolChange(1)} icon="pi pi-user" label="Administrador" className="p-button-rounded p-button-primary ml-2" />
                            <Button onClick={()=>rolChange(2)} icon="pi pi-cog" label="Gerente" className="p-button-rounded p-button-secondary ml-2" />
                            <Button onClick={()=>rolChange(3)} icon="pi pi-info" label="Participante" className="p-button-rounded p-button-warning ml-2" />
                        </div>
                        <div className="text-center d-block d-xl-none">
                            <Button onClick={()=>rolChange(1)} tooltip="Administrador" icon="pi pi-user" className="p-button-rounded p-button-primary ml-2" />
                            <Button onClick={()=>rolChange(2)} tooltip="Gerente" icon="pi pi-cog" className="p-button-rounded p-button-secondary mx-4" />
                            <Button onClick={()=>rolChange(3)} tooltip="Participante" icon="pi pi-info" className="p-button-rounded p-button-warning ml-2" />
                        </div>
                </Dialog>
        </div>
    );
}
