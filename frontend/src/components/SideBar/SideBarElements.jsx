import styled from "styled-components";
import {FaTimes} from "react-icons/fa";
import {Link as LinkR} from "react-router-dom";
import {Link as LinkS} from "react-scroll";

export const SideBarContainer=styled.aside`
position:fixed;
z-index:999;
width:100%;
height:100%;
background:#872657;
display:grid;
align-items:center;
top:0;
left:0;
transition:0.3s ease-in-out;
opacity:${({isopen})=>(isopen ? '100%' : '0') };
top:${({isopen})=>(isopen ? '0' : '-100%') };
`
export const ClosedIcon=styled(FaTimes)`
color:#fff;
`

export const Icon=styled.div`
position:absolute;
top:1.2rem;
right:1.5rem;
background:transparent;
font-size:2rem;
cursor:pointer;
outline:none;
`
export const SidebarWrapper=styled.div`
color:#fff;
`
export const SidebarLink=styled(LinkS)`
display:flex;
align-items:center;
justify-content:center;
font-size:1.5rem;
font-weight:bold;
text-decoration:none;
list-style:none;
transition:0.2s ease-in-out;
text-decoration:none;
color:black;
cursor:pointer;

&:hover{
    color:white;
    transition:0.2s ease-in-out;
}
`
export const SideBtnWrap=styled.div`
display:flex;
justify-content:center;
`
export const SidebarRoute=styled(LinkR)`
border-radius:50px;
background:#01bf71;
white-space:nowrap;
padding:16px 64px;
color:#010606;
font-size:16px;
outline:none;
cursor:pointer;
transition:0.2s ease-in-out;
text-decoration:none;
&:hover{
    background:#fff;
    color:#010606;
    transition:0.2s ease-in-out;
}
`
export const SidebarMenu=styled.ul`
display:grid;
grid-template-columns:1fr;
grid-template-rows:repeat(6,80px);
text-align:center;
@media screen and (max-width:480px){
    rid-template-rows:repeat(6,68px);
}
`