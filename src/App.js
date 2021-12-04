import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

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
import './App.scss';
import IndexUsu from './pages/usuario/IndexUsu';
import IndexSolicitud from './pages/solicitud/IndexSolicitud';
import IndexAnimal from './pages/animal/IndexAnimal';
import IndexTipoAnimal from './pages/tipoAnimal/IndexTipoAnimal';
import IndexEnfermedad from './pages/enfermedad/IndexEnfermedad';
import IndexTratamiento from './pages/tratamiento/IndexTratamiento';
import IndexFotografia from './pages/fotografia/IndexFotografia';
import IndexDocumento from './pages/documentoAdopcion/IndexDocumento';


const App = () => {

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
                    label:'Inicio', icon: 'pi pi-fw pi-home', to:'/inicio'
                }
            ]
        },
        {
            label: 'Modulos',
            items: [
                {label:'Usuarios', icon:'pi pi-fw pi-users', to:'/usuarios'},
                {label:'Solicitudes de adopción', icon:'pi pi-fw pi-file', to:'/solicitudesAdopcion'},
                {label:'Documentos de solicitudes de adopción', icon:'pi pi-fw pi-file', to:'/documentoSolicitud'},
                {label:'Animales', icon:'pi pi-fw pi-twitter', to:'/animal'},
                {label:'Tipos de animal', icon:' pi-fw pi-th-large', to:'/tipoAnimal'},
                {label:'Enfermedades', icon:'pi pi-fw pi-clone', to:'/enfermedad'},
                {label:'Tratamientos', icon:'pi pi-fw pi-heart', to:'/tratamiento'},
                {label:'Fotografia', icon:'pi pi-fw pi-heart', to:'/fotografia'}
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
                            items: [{label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'}]
                        },
                        {
                            label: 'UI Kit', icon: 'pi pi-fw pi-sitemap',
                            items: [
                                {label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/formlayout'},
                                {label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input'},
                                {label: "Float Label", icon: "pi pi-fw pi-bookmark", to: "/floatlabel"},
                                {label: "Invalid State", icon: "pi pi-fw pi-exclamation-circle", to: "invalidstate"},
                                {label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button'},
                                {label: 'Table', icon: 'pi pi-fw pi-table', to: '/table'},
                                {label: 'List', icon: 'pi pi-fw pi-list', to: '/list'},
                                {label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree'},
                                {label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel'},
                                {label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay'},
                                {label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu'},
                                {label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages'},
                                {label: 'File', icon: 'pi pi-fw pi-file', to: '/file'},
                                {label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart'},
                                {label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc'},
                            ]
                        },
                        {
                            label: 'Pages', icon: 'pi pi-fw pi-clone',
                            items: [
                                {label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud'},
                                {label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline'},
                                {label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty'}
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
            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                       mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick}/>

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/usuarios" exact>
                    <IndexUsu/>
                    </Route>
                    <Route path="/solicitudesAdopcion" exact>
                    <IndexSolicitud/>
                    </Route>
                    <Route path="/documentoSolicitud" exact>
                    <IndexDocumento/>
                    </Route>
                    <Route path="/animal" exact>
                    <IndexAnimal/>
                    </Route>
                    <Route path="/tipoAnimal" exact>
                    <IndexTipoAnimal/>
                    </Route>
                    <Route path="/enfermedad" exact>
                    <IndexEnfermedad/>
                    </Route>
                    <Route path="/tratamiento" exact>
                    <IndexTratamiento/>
                    </Route>
                    <Route path="/fotografia" exact>
                    <IndexFotografia/>
                    </Route>


                    {/* Plantilla */}
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/formlayout" component={FormLayoutDemo}/>
                    <Route path="/input" component={InputDemo}/>
                    <Route path="/floatlabel" component={FloatLabelDemo}/>
                    <Route path="/invalidstate" component={InvalidStateDemo}/>
                    <Route path="/button" component={ButtonDemo}/>
                    <Route path="/table" component={TableDemo}/>
                    <Route path="/list" component={ListDemo}/>
                    <Route path="/tree" component={TreeDemo}/>
                    <Route path="/panel" component={PanelDemo}/>
                    <Route path="/overlay" component={OverlayDemo}/>
                    <Route path="/menu" component={MenuDemo}/>
                    <Route path="/messages" component={MessagesDemo}/>
                    <Route path="/file" component={FileDemo}/>
                    <Route path="/chart" component={ChartDemo}/>
                    <Route path="/misc" component={MiscDemo}/>
                    <Route path="/timeline" component={TimelineDemo}/>
                    <Route path="/crud" component={Crud}/>
                    <Route path="/empty" component={EmptyPage}/>
                    <Route path="/documentation" component={Documentation}/>
                </div>

                <AppFooter layoutColorMode={layoutColorMode}/>
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                       layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default App;
