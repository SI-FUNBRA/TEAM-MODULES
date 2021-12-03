import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components/macro';
import { Link } from 'react-scroll';

import { menuData } from './dataHomepage/MenuData';
import { Buutton } from './Buutton';

import { FaBars } from 'react-icons/fa';

import {animateScroll as scroll} from 'react-scroll';

import Logoo from '../../images/Logo.png';
import NavBarButonLog from './NavBarButonLog';

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

const NaavLink=css`
    color:${({scrollNav}) => (scrollNav ? '#fff' : '#696969')};
    display:flex;
    align-items:center;
    padding:0 1rem;
    height:100%;
    cursor:pointer;
    text-decoration:none;

    &:hover{
        color:gray;
    }

    &.active{
        background-color:#5d55e3;
        color:#fff;
        padding:7px 14px;
    }
`;

const NaavMenuBars=styled(FaBars)`
    display:none;

    @media screen and (max-width: 1048px){
        display:block;
        margin-top:6px;
        color:#11B3C9;
    }
`;

const NaavMenu=styled.div`
    display:flex;
    align-items:center;
    margin-right:-48px;

    @media screen and (max-width:1048px){
        display:none;
    }
`
const NaavMenuLinks=styled(Link)`
    ${NaavLink}
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
            <NaavMenuBars onClick={toggle}/>
            <NaavMenu>
                {menuData.map((item, i)=>(
                    <Link key={i}>
                        <NaavMenuLinks
                            to={item.link}
                            activeClass="active"
                            spy={true}
                            smooth={true}
                            offset={-50}
                            duration={500}
                            delay={-1000}
                            >
                            {item.title}
                        </NaavMenuLinks>
                    </Link>
                ))}
            </NaavMenu>
            <NaavBtn>
                {!localStorage.getItem('token')&&<Buutton to="/log/login" primary="true">Iniciar Sesión</Buutton>}
                {localStorage.getItem('token')&&<NavBarButonLog/>}
            </NaavBtn>
        </Naav>
    )
}

export default Navbar;
