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



const Homepage = () => {

    const [isOpen,setIsOpen]=useState(false);

    const toggle=()=>{
        setIsOpen(!isOpen);
    };

    const toggleHome=()=>{
        scroll.scrollToTop();
    }

    return (
        <>
            <GlobalStyle />
            <Navbar toggle={toggle} />
            <Dropdown isOpen={isOpen} toggle={toggle} />
            <Slideshow />
            <AcercaDe {...InfoData} />
            <Modulos />
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
        </>
    );
};

export default Homepage;
