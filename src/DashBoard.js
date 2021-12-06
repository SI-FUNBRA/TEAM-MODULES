import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { DashTopbar } from './DashTopbar';
import { DashFooter } from './DashFooter';
import { DashMenu } from './DashMenu';
import { DashConfig } from './DashConfig';

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './dashBoard.scss';

import {DashMenuOptions} from './DashMenuOptions'

import IndexUsu from './pages/usuario/IndexUsu';
import OtrosModulosUsuarios from './pages/OtrosModulos/OtrosModulosUsuarios';
import OtrosModulosPaisesCiudades from './pages/OtrosModulosPaisCiudad/OtrosModulosPaisesCiudades';
import Perfil from './pages/Perfil/Perfil';
import Permisos from './pages/permisos/Permisos';
import { ServicioUsu } from './service/ServicioUsu';
import DonacionesEcon from './pages/DonacionesEconomicas/IndexDonEcon';
import DonacionesEsp from './pages/DonacionesEspecie/IndexDonEsp';
import Cita from './pages/cita/IndexCita';
import Sede from './pages/sede/IndexSede';

import Animal from './pages/animal/IndexAnimal';
import DocumentoAdopcion from './pages/documentoAdopcion/IndexDocumento';
import Enfermedad from './pages/enfermedad/IndexEnfermedad';
import Fotografia from './pages/fotografia/IndexFotografia';
import Solicitud from './pages/solicitud/IndexSolicitud';
import TipoAnimal from './pages/tipoAnimal/IndexTipoAnimal';
import Tratamiento from './pages/tratamiento/IndexTratamiento';


const DashBoard = () => {

    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    const [userLog, setUserLog] = useState({
        nombre:'',
        id:'',
        rol:''
    })

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }

        const serviUsu = new ServicioUsu()

        serviUsu.getUsertopbar().then(res=>{
            setUserLog(res.data)
        })

    }, [mobileMenuActive]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if(mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const optionsMenuFun = new DashMenuOptions()

    const menu = optionsMenuFun.optionsMenu(userLog.Rol)

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <DashTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                       mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <DashMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/dash/inicio">

                    </Route>
                    <Route path="/dash/usuarios" exact>
                        <IndexUsu/>
                    </Route>
                    <Route path="/dash/otrosmodulos" exact>
                        <OtrosModulosUsuarios/>
                    </Route>
                    <Route path="/dash/otrosmodulosPaisCiudad" exact>
                        <OtrosModulosPaisesCiudades/>
                    </Route>
                    <Route path="/dash/perfil" exact>
                        <Perfil/>
                    </Route>
                    <Route path="/dash/permisos" exact>
                        <Permisos/>
                    </Route>
                    <Route path="/dash/donacionEconomica" exact>
                        <DonacionesEcon/>
                    </Route>
                    <Route path="/dash/donacionEspecie" exact>
                        <DonacionesEsp/>
                    </Route>
                    <Route path="/dash/cita" exact>
                        <Cita/>
                    </Route>
                    <Route path="/dash/sede" exact>
                        <Sede/>
                    </Route>


                    <Route path="/dash/animal" exact>
                        <Animal/>
                    </Route>
                    <Route path="/dash/solicitudesAdopcion" exact>
                        <DocumentoAdopcion/>
                    </Route>
                    <Route path="/dash/enfermedad" exact>
                        <Enfermedad/>
                    </Route>
                    <Route path="/dash/fotografia" exact>
                        <Fotografia/>
                    </Route>
                    <Route path="/dash/tipoAnimal" exact>
                        <TipoAnimal/>
                    </Route>
                    <Route path="/dash/tratamiento" exact>
                        <Tratamiento/>
                    </Route>
                    <Route path="/dash/documentoSolicitud" exact>
                        <Solicitud/>
                    </Route>
                </div>

                <DashFooter layoutColorMode={layoutColorMode}/>
            </div>

            <DashConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                       layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default DashBoard;
