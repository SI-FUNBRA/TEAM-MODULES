import React from 'react';
import ImgDonaciones from '../../images/Adopciones.jpg';
import styled from 'styled-components';
import { Buutton } from '../components-homepage/Buutton';

import {RiMoneyDollarBoxFill} from 'react-icons/ri';
import {AiOutlineArrowLeft} from 'react-icons/ai'

const ImgC=styled.div`
    img{
        position:relative;
        top:3rem;
        width:100vw;
        height: 65vh;
        object-fit:cover;
        object-position: center;
    }

    .TextCatalog{
        position: absolute;
        top: 25%;
        left: 10rem;
        z-index: 1;
    }

    @media screen and (max-width: 1199px){
        .TextCatalog{
            color: #fff;
        }

        img{
            filter: brightness(80%);
        }
    }

    @media screen and (max-width: 670px){
        .TextCatalog{
            left: 2rem;
        }
    }

    @media screen and (max-width: 420px){
        .TextCatalog{
        }
    }
`;

const Hero = () => {
    return (
        <div>
            <ImgC className="text-center">
                <div className="TextCatalog">
                    <h4 className="text-center">ENCUENTRA TU ALMA GEMELA</h4>
                    <h1 className="text-center">Adopciones</h1>
                    <div style={{'marginTop': '2rem'}}>
                        <Buutton to="/" className="bg-secondary text-light" style={{'display': 'inline', 'marginRight': '1rem'}}><AiOutlineArrowLeft /> Volver al Inicio</Buutton>
                        <Buutton to="/donacionEconomica" primary="true" style={{'display': 'inline'}}>Haz una Donación <RiMoneyDollarBoxFill size={20} /></Buutton>
                    </div>
                </div>
                <img src={ImgDonaciones} alt='Imagen Adopciones' />
            </ImgC>
        </div>
    )
}

export default Hero
