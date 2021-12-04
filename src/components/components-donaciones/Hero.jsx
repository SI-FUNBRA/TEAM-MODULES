import React from 'react';
import styled from 'styled-components/macro';
import Donaciones from '../../images/Donaciones.jpg';

import { Buutton } from '../components-homepage/Buutton';


const  HeroSection=styled.section`
    height: 90vh;
    max-height:1000px;
    position:relative;
    overflow:hidden;

    .BotonesDon{
        width: 100%;
        position: absolute;
        z-index: 1;
    }

`;

const HeroWrapper=styled.div`
    width:100%;
    height:100%;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    position:relative;
`;

const Immg=styled.img`
    position:absolute;
    top:3rem;
    left:0;
    width:100vw;
    height:80vh;
    object-fit:cover;
`;


const Hero = (props) => {

    return (
        <HeroSection id='/inicio'>
            <HeroWrapper>
                <Immg src={Donaciones} alt="Imagen de donaciones"></Immg>
                <div className="BotonesDon">
                    <h1 className="text-end me-5 font-weight-bold">Juntos Podemos Superarlo</h1>
                    <h2 className="text-end me-5 mb-4">Dona para nuestros animalitos</h2>
                    <h6 className="text-end me-5">El brote de COVID-19 y la subsiguiente cuarentena de las comunidades<br /> hicieron que muchos animalitos perdieran su hogar. Por eso debemos ayudarles!</h6>
                    <div className="d-flex justify-content-end me-5 mt-4">
                        <Buutton to="/" className="bg-secondary text-light me-4" style={{'display': 'inline-block'}}>Volver al Inicio</Buutton>
                        <Buutton to='' onClick={()=>props.showDialog('/catalogoAnimales')} primary="true" style={{'display': 'inline-block'}}>Adoptar</Buutton>
                    </div>
                </div>
            </HeroWrapper>
        </HeroSection>
    )
}

export default Hero;
