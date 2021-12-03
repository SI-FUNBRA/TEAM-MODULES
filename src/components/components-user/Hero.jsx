import React from 'react';
import styled from 'styled-components/macro';
import Landing from '../../images/landing.jpeg';

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


const Hero = () => {

    return (
        <HeroSection id='/inicio'>
            <HeroWrapper>
                <Immg src={Landing} alt="Imagen de donaciones"></Immg>
                <div className="BotonesDon">
                    <h1 className="text-center me-5 font-weight-bold">¡BIENVENIDO!</h1>
                    <h2 className="text-center me-5 mb-4">Nuestra fundacion se complace verte</h2>
                    <div className="d-flex justify-content-center me-5 mt-4">
                        <Buutton to="/" className="bg-secondary text-light me-4" style={{'display': 'inline-block'}}>Volver al Inicio</Buutton>
                    </div>
                </div>
            </HeroWrapper>
        </HeroSection>
    )
}

export default Hero;
