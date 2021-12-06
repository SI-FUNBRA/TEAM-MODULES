import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';

import {animateScroll as scroll} from 'react-scroll';

import Logoo from '../../images/Logo.png';
import NavBarButonLog from '../components-homepage/NavBarButonLog';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router';

import { BiBriefcase } from "react-icons/bi";

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

const NaavBtn=styled.div`
    display:flex;
    align-items:center;

    @media screen and (max-width:1048px){
        display:none;
    }
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

    const history = new useHistory()

    const handleButton = () =>{
            history.push('/dash')
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
            <div className="flex alining-items-center">
                <NaavBtn>
                    {localStorage.getItem('token')&&<NavBarButonLog/>}
                </NaavBtn>
                <Button tooltip="DashBoard" tooltipOptions={{position:'left'}} className="d-flex d-xl-none col-12" onClick={handleButton}><BiBriefcase/></Button>
            </div>

        </Naav>
    )
}

export default Navbar;
