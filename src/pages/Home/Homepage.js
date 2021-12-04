import React, {useState} from 'react';

import Navbar from '../../components/components-homepage/Navbar';
import GlobalStyle from '../../components/components-homepage/GlobalStyle';
import Slideshow from '../../components/components-homepage/Slideshow';
import Dropdown from '../../components/components-homepage/Dropdown';
import AcercaDe from '../../components/components-homepage/AcercaDe';
import { InfoData, InfoDataTwo } from '../../components/components-homepage/dataHomepage/InfoData';
import Footer from '../../components/components-homepage/Footer';
import Funcionalidades from '../../components/components-homepage/Funcionalidades';
import Modulos from '../../components/components-homepage/Modulos';
import Contacto  from '../../components/components-homepage/Contacto';
import Ventajas from '../../components/components-homepage/Ventajas';

import './Homepage.css'

import {animateScroll as scroll} from 'react-scroll';

import { AiOutlineArrowUp } from 'react-icons/ai';
import { Dialog } from 'primereact/dialog';
import LogPopup from '../../components/components-homepage/LogPopup';
import { useHistory } from 'react-router-dom';



const Homepage = () => {

    const history = useHistory();

    const [isOpen,setIsOpen]=useState(false);

    const toggle=()=>{
        setIsOpen(!isOpen);
    };

    const toggleHome=()=>{
        scroll.scrollToTop();
    }

    const [dialogLogin, setDialogLogin] = useState(false)

    const showDialog = (ruta) =>{

        if(localStorage.getItem('token')){
            history.push(ruta)
        }else{
        setDialogLogin(true)
        }
    }

    const hideDialog = () =>{
        setDialogLogin(false)
    }

    return (
        <>
            <GlobalStyle />
            <Navbar toggle={toggle} />
            <Dropdown isOpen={isOpen} toggle={toggle} />
            <Slideshow showDialog={showDialog}/>
            <AcercaDe {...InfoData} />
            <Modulos showDialog={showDialog}/>
            <Funcionalidades {...InfoDataTwo} />
            <Ventajas />
            <Contacto />
            <Footer />
            <AiOutlineArrowUp onClick={toggleHome} size={40} style={{
                'background': '#000',
                'color': '#fff',
                'zIndex':'100',
                'position': 'fixed',
                'padding': '10px',
                'display': 'flex',
                'bottom': '0',
                'right': '1.8rem',
                'cursor': 'pointer',
                'borderRadius': '5px 5px 0 0'
            }} />


            <Dialog className="col-11 d-sm-4 md:col-6 xl:col-5" visible={dialogLogin} header="Para Continuar:" modal onHide={hideDialog}>
                <LogPopup hideDialog={hideDialog}/>
            </Dialog>
        </>
    );
};

export default Homepage;
