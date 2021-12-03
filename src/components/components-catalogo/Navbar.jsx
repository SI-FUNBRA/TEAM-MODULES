import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';

import {animateScroll as scroll} from 'react-scroll';

import Logoo from '../../images/Logo.png';

const Naav=styled.nav`
    background:${({scrollNav}) => (scrollNav ? '#fff' : 'transparent')};
    height:60px;
    display:flex;
    justify-content:space-between;
    padding:1rem 2rem;
    z-index:100;
    position:fixed;
    width:100%;

    backdrop-filter: blur(8px) saturate(200%);
    -webkit-backdrop-filter: blur(8px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(209, 213, 219, 0.3);
`;

const Navbar = ({toggle}) => {

    const [scrollNav, setScrollNav]=useState(false);
    const changeNav=()=>{
        if(window.scrollY>=80){
            setScrollNav(true);
        }else{
            setScrollNav(false);
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll', changeNav)
    }, []);

    const toggleHome=()=>{
        scroll.scrollToTop();
    }


    return (
        <Naav scrollNav={scrollNav}>
            <img src={Logoo} alt="Logo Zoopport" onClick={toggleHome}
                style={{
                    'cursor': 'pointer',
                    'margin': '-10px -60px 0 0',
                    'width': '200px',
                    'height':'45px'
                }}
            />
        </Naav>
    )
}

export default Navbar;
