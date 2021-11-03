import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { menuData } from './dataHomepage/MenuData';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Buutton } from './Buutton';

import Logoo from '../../images/Logo.png';

//import { LinkScroll } from 'react-scroll';

const DropdawnContainer=styled.div`
    position:fixed;
    z-index:999;
    width:100%;
    height:100%;
    background:#fff;
    display:grid;
    align-items:center;
    top:0;
    left:0;
    transition:0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '1' : '0')};
    top:${({isOpen}) => (isOpen ? '0' : '-100%')};
`;

const DropdawnIcon=styled.div`
    position: absolute;
    top:1.2rem;
    right:1.5rem;
    background:transparent;
    font-size:2rem;
    cursor:pointer;
    outline:none;
`;

const CloseIcon=styled(FaTimes)`
    color:#000d1a;
`;

const DropDownWrapper=styled.div`
    
`;

const DropdownMenu=styled.div`
    display:grid;
    grid-template-columns:1fr;
    grid-template-rows:repeat(6,70px);
    text-align:center;
    margin-bottom:4rem;

    @media screen and (max-width:480px){
        grid-template-rows:repeat(4,60px);
    }
`;

const DropdownLink=styled(Link)`
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:1.5rem;
    text-decoration:none;
    list-style:none;
    color:#000;
    cursor:pointer;
    transition:0.2s ease-in-out;

    &:hover{
        color:#000d1a;
    }
`;

const BtnWrap=styled.div`
    display:flex;
    justify-content:center;
`;



const Dropdown = ({isOpen, toggle}) => {
    return (
        <DropdawnContainer isOpen={isOpen} onClick={toggle}>
            <DropdawnIcon onClick={toggle}>
                <CloseIcon />
            </DropdawnIcon>
            <img src={Logoo} alt="Logo Zoopport" style={{
                    'margin': '0 0 -50px 50px',
                    'width': '160px', 
                    'height': '110px;'
                }}
            />
            <DropDownWrapper>
                <DropdownMenu>
                    {menuData.map((item,i)=>(
                        <DropdownLink to={item.link} key={i}>{item.title}</DropdownLink>
                    ))}
                </DropdownMenu>
                <BtnWrap>
                    <Buutton primary='true' round='true' big='true' to='/acercaDe'>Iniciar Sesión</Buutton>
                </BtnWrap>
            </DropDownWrapper>
        </DropdawnContainer>
    )
}

export default Dropdown;
