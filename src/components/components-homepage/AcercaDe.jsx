import React, { Fragment } from 'react';
import styled from 'styled-components';

import image from '../../images/imagaSeven.jpg';

const AcercaDeSection=styled.section`
    background: url(${image}) no-repeat left;
    background-size:70%;
    background-color:#fdfdfd;
    overflow:hidden;
    padding:100px 0;
    margin-left: 50px;

    .inner-container{
        width:55%;
        float:right;
        background-color:#fdfdfd;
        padding:120px;
    }

    .inner-container h1{
        margin-bottom:30px;
        font-size: 30px;
        font-weight:900;
    }

    .text{
        font-size:13px;
        color:#545454;
        line-height:30px;
        text-align:justify;
    }

    @media screen and (max-width: 960px){

        background: none;

        .inner-container{
            width: 100%;
        }
        
    }

    @media screen and (max-width:600px){
        padding:0;
        
        .inner-container{
            padding:60px;
        }
    }
`;

const AcercaDe = () => {
    return (
        <AcercaDeSection id='/acercaDe'>
            <div className="inner-container">
                <h1>Funbra - Zoopport</h1>
                <p class="text">
                Somos una Fundación sin fines de lucro, dedicada a el bienestar de toda la comunidad, tomando como inicio el gremio animalista. Rescatamos Y Rehabilitamos animales habitantes en estado de vulnerabilidad.
                </p>
                <p class="text">
                Somos una fundacion dedicada al rescate y rehabilitacion de los animales habitantes de la calle, luego de esto iniciamos proceso de adopcion :)
                </p>
            </div>           
        </AcercaDeSection>
    )
}

export default AcercaDe;
