import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll';

const FooterContainer=styled.footer`

    background: rgba( 255, 255, 255, 0.7 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 16px );
    -webkit-backdrop-filter: blur( 16px );
    border: 1px solid rgba( 255, 255, 255, 0.18 );
    padding-bottom:20px;

    a {
        color: #1bb1dc;
        text-decoration: none;
        transition: 0.5s;
    }

    a:hover, a:active, a:focus {
        color: #0a98c0;
        outline: none;
        text-decoration: none;
    }

    .copyright {
        text-align: center;
        padding-top: 30px;
        color: #535074;
        font-size: 15px;
      }
      
      .credits {
        text-align: center;
        font-size: 14px;
        padding-top: 4px;
        color: #8582a8;
      }
      
      .credits a {
        color: #1bb1dc;
      }
      
      .credits a:hover {
        color: #0a98c0;
      }
`;

const Footer = () => {

    const toggleHome=()=>{
        scroll.scrollToTop();
    }

    return (
        <FooterContainer>
                <div className="copyright">
                    &copy; Copyright <strong><Link to='/' onClick={toggleHome}>FUNBRA-Zoopport</Link></strong>. {new Date().getFullYear()} Todos los derechos reservados.
                </div>
                <div className="credits">
                    Diseñado por <a href="/">Zoopport</a>
                </div>
        </FooterContainer>
    )
}

export default Footer;  