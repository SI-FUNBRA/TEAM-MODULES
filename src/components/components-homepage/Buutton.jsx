import styled from "styled-components";
import { Link } from "react-router-dom";

export const Buutton=styled(Link)`
    background: ${({primary}) => (primary ? '#11B3C9' : '#CD853F')};
    white-space:nowrap;
    outline:none;
    border:none;
    min-width:100px;
    max-width:200px;
    cursor:pointer;
    text-decoration:none;
    transition:0.3s;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:${({big}) => (big ? '16px 40px' : '14px 24px')};
    color: ${({primary}) =>(primary ? '#fff' : '#000d1a')};
    font-size: ${({big}) => (big ? '20px' : '14px')};
    border-radius:3px;

    // background: #e0e0e0;
    // box-shadow:  5px 5px 10px #bebebe,
    //              -5px -5px 10px #ffffff;

     &:hover{
         transform: translateY(-2px);
         color:#fff;
     }
`
