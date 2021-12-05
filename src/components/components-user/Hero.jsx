import React from 'react';
import styled from 'styled-components/macro';
import Landing from '../../images/header-background.png';
import imgUsuarios from '../../images/usuarios.jpg';
import { Buutton } from '../components-homepage/Buutton';


const  HeroSection=styled.section`
    height: 100vh;
    max-height:1000px;
    position:relative;
    overflow:hidden;

    .BotonesDon{
        display: flex;
        flex-direction: column;
        width: 100%;
        position: absolute;
        margin-left: 10rem;
        z-index: 1;
    }

    .imagenUsuario{
        margin-left: 40rem;
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
                    <h1 className="font-weight-bold">¡BIENVENIDO!</h1>
                    <h2 className="mb-4">Nuestra fundacion se complace verte</h2>
                    <p className="me-5 mb-4">Como usuario de nuestra fundacion tienes una nueva vista en nuestra<br /> pagina para que puedas realizar adopciones, donaciones o participaciones</p>
                    <div className="me-5 mt-4">
                        <Buutton to="/" className="bg-secondary text-light me-4" style={{'display': 'inline-block'}}>Volver al Inicio</Buutton>
                    </div>
                </div>
                <div className="imagenUsuario">
                    <img src={imgUsuarios} alt="" style={{
                            'width': '500px',
                            'height': '500px',
                            'borderRadius': '100%',
                            'object-fit': 'cover'
                        }} />
                </div>
            </HeroWrapper>
        </HeroSection>
    )
}

export default Hero;
