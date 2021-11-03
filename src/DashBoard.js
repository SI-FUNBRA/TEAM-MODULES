import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { DashTopbar } from './DashTopbar';
import { DashFooter } from './DashFooter';
import { DashMenu } from './DashMenu';
import { DashConfig } from './DashConfig';

import { Dashboard } from './components/plantilla/Dashboard';
import { ButtonDemo } from './components/plantilla/ButtonDemo';
import { ChartDemo } from './components/plantilla/ChartDemo';
import { Documentation } from './components/plantilla/Documentation';
import { FileDemo } from './components/plantilla/FileDemo';
import { FloatLabelDemo } from './components/plantilla/FloatLabelDemo';
import { FormLayoutDemo } from './components/plantilla/FormLayoutDemo';
import { InputDemo } from './components/plantilla/InputDemo';
import { ListDemo } from './components/plantilla/ListDemo';
import { MenuDemo } from './components/plantilla/MenuDemo';
import { MessagesDemo } from './components/plantilla/MessagesDemo';
import { MiscDemo } from './components/plantilla/MiscDemo';
import { OverlayDemo } from './components/plantilla/OverlayDemo';
import { PanelDemo } from './components/plantilla/PanelDemo';
import { TableDemo } from './components/plantilla/TableDemo';
import { TreeDemo } from './components/plantilla/TreeDemo';
import { InvalidStateDemo } from './components/plantilla/InvalidStateDemo';

import { Crud } from './pages/plantilla/Crud';
import { EmptyPage } from './pages/plantilla/EmptyPage';
import { TimelineDemo } from './pages/plantilla/TimelineDemo';

import PrimeReact from 'primereact/api';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './layout/flags/flags.css';
import './layout/layout.scss';
import './dashBoard.scss';
import IndexUsu from './pages/usuario/IndexUsu';
import Pruebar from './pages/usuario/Pruebar';

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

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
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

    const menu = [
        {
            label: 'Principal',
            items: [
                {
                    label:'Inicio', icon: 'pi pi-fw pi-home', to:'/dash/inicio'
                }
            ]
        },
        {
            label: 'Modulos',
            items: [
                {label:'Usuarios', icon:'pi pi-fw pi-users', to:'/dash/usuarios'}
            ]
        },
        {
            label: 'Plantilla Sakai-PrimeReact', icon: 'pi pi-fw pi-search',
            items: [
                {
                    label: 'Plantilla', icon: 'pi pi-fw pi-star pi-spin',
                    items: [
                        {
                            label: 'Home',
                            items: [{label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dash'}]
                        },
                        {
                            label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/dash/formlayout'},
                                {label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/dash/input'},
                                {label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/dash/floatlabel"},
                                {label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate"},
                                {label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/dash/button'},
                                {label: 'Table', icon: 'pi pi-fw pi-table', to: '/dash/table'},
                                {label: 'List', icon: 'pi pi-fw pi-list', to: '/dash/list'},
                                {label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/dash/tree'},
                                {label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/dash/panel'},
                                {label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/dash/overlay'},
                                {label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/dash/menu'},
                                {label: 'Message', icon: 'pi pi-fw pi-comment', to: '/dash/messages'},
                                {label: 'File', icon: 'pi pi-fw pi-file', to: '/dash/file'},
                                {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/dash/chart'},
                                {label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/dash/misc'},
                            ]
                        },
                        {
                            label: 'Pages', icon: 'pi pi-fw pi-clone',
                            items: [
                                {label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/dash/crud'},
                                {label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/dash/timeline'},
                                {label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/dash/empty'}
                            ]
                        },
                        {
                            label: 'Menu Hierarchy', icon: 'pi pi-fw pi-search',
                            items: [
                                {
                                    label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
                                    items: [
                                        {
                                            label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
                                            items: [
                                                {label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark'},
                                                {label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark'},
                                                {label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark'},
                                            ]
                                        },
                                        {
                                            label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
                                            items: [
                                                {label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark'},
                                                {label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark'}
                                            ]
                                        },
                                    ]
                                },
                                {
                                    label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
                                    items: [
                                        {
                                            label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
                                            items: [
                                                {label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark'},
                                                {label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark'},
                                                {label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark'},
                                            ]
                                        },
                                        {
                                            label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
                                            items: [
                                                {label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark'},
                                                {label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark'}
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            label: 'Get Started',
                            items: [
                                {label: 'Documentation', icon: 'pi pi-fw pi-question', command: () => {window.location = "#/documentation"}},
                                {label: 'View Source', icon: 'pi pi-fw pi-search', command: () => {window.location = "https://github.com/primefaces/sakai-react"}}
                            ]
                        },
                    ]
                }
            ]
        }
    ];

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
                    <Route exact path="/dash/inicio">
                        <Pruebar />
                    </Route>
                    <Route path="/dash/usuarios" exact>
                        <IndexUsu/>
                    </Route>
                    {/* Plantilla */}
                    <Route path="/dash" exact component={Dashboard}/>
                    <Route path="/dash/formlayout" component={FormLayoutDemo}/>
                    <Route path="/dash/input" component={InputDemo}/>
                    <Route path="/dash/floatlabel" component={FloatLabelDemo}/>
                    <Route path="/dash/invalidstate" component={InvalidStateDemo}/>
                    <Route path="/dash/button" component={ButtonDemo}/>
                    <Route path="/dash/table" component={TableDemo}/>
                    <Route path="/dash/list" component={ListDemo}/>
                    <Route path="/dash/tree" component={TreeDemo}/>
                    <Route path="/dash/panel" component={PanelDemo}/>
                    <Route path="/dash/overlay" component={OverlayDemo}/>
                    <Route path="/dash/menu" component={MenuDemo}/>
                    <Route path="/dash/messages" component={MessagesDemo}/>
                    <Route path="/dash/file" component={FileDemo}/>
                    <Route path="/dash/chart" component={ChartDemo}/>
                    <Route path="/dash/misc" component={MiscDemo}/>
                    <Route path="/dash/timeline" component={TimelineDemo}/>
                    <Route path="/dash/crud" component={Crud}/>
                    <Route path="/dash/empty" component={EmptyPage}/>
                    <Route path="/dash/documentation" component={Documentation}/>
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
