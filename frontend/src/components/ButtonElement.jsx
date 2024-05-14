import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button=styled(Link)`
text-decoration:none;
font-weight:bold;
border-radius:50px;
background:${({primary})=>(primary?'#c03e7a':'#fff' )};
white-space:nowrap;
padding:${({big})=>(big?'14px 48px':'12px 30px' )};
color:black;
font-size:${({fontBig})=>(fontBig ?'20px':'16px' )};
outline:none;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
transition: all 0.2s ease-in-out;

&:hover{
    color:white;
    transition: all 0.2s ease-in-out;
    background:${({primary})=>(primary?'#01ff06':'#01ff06' )};
}

`