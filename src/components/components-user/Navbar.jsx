import React, {useState, useEffect} from 'react';
import styled, { css } from 'styled-components/macro';
import { menuData } from './MenuData';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-scroll';

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

    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.76);
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
    margin-right:-20px;

    @media screen and (max-width:1048px){
        display:none;
    }
`
const NaavMenuLinks=styled(Link)`
    ${NaavLink}
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
                    'margin': '-10px -45px 0 0',
                    'width': '210px',
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
        </Naav>
    )
}

export default Navbar;
