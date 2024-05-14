import styled from 'styled-components'
import {Link as LinkR} from 'react-router-dom'
import { Link as LinkS } from 'react-scroll'
export const Nav=styled.nav`
background:#3b0318;
opacity:0.97;
height:80px;
margin-top:-80px;
display:flex;
justify-content:center;
align-items:center;
font-size:1rem;
position:sticky;
top:0;
z-index:10;
@media screen ans (max-width:960px){
    transition:0.8 all ease;
}
`
 export const NavbarContainer=styled.div`
 display:flex;
 justify-content:space-between;
 height:80px;
 z-index:1;
 width:100%;
 max-width:1100px
 `
 export const NavLogo=styled(LinkR)`
 color:#fff;
 justify-self:flex-start;
 cursor:pointer;
 font-size:2rem;
 color:	white;
 font-family:"Exo 2", sans-serif;

 display:flex;
 align-items:center;
 margin-left:1rem;
 font-weight:bold;
 text-decoration:none;
 `
 export const LogoImg=styled.img`
 height:4rem;
 width:4rem;
 `
 export const MobileIcon=styled.div` 
 color:#fff;
 display:none;

 @media screen and (max-width: 768px){
    display:block;
    position:absolute;
    top:0;
    right:0;
    transform:translate(-100%,60%);
    font-size:1.8rem;
    cursor:pointer;
 }`

 export const NavMenu=styled.ul`
 display:flex;
 
 align-items:center;
 text-align:center;
 list-style:none;
 margin-right:-22px;
 @media screen and (max-width:768px){
    display:none;
 }
 `
 export const NavItem=styled.li`
 height:80px;
 `
 export const NavLinks=styled(LinkS)`
 color:#fff;
 display:flex;
 align-items:center;
 

 
 text-decoration: none;
 padding:1rem;
 font-size:1.2rem;
 font-weight:bold;
 height:100%;
 cursor:pointer;

 &:active{
    border-bottom:3px solid #FFB6C1
 }
 `
 export const NavBtn=styled.nav`
 display:flex;
 align-items:center;
 @media screen and (max-width:768px){
   display:none;
 }`

 export const NavBtnLink=styled(LinkR)`
 border-radius:50px;
 background-color:#da1d6f;
 white-space:nowrap;
padding:10px 22px;
color:white;
font-size:16px;
font-weight:bold;
outline:none;
cursor:pointer;
transition:all 0.2s ease-in-out;
text-decoration:none;
&:hover{
   transition:all 0.2s;
   background:#fff;
   color:#010606;

}

 `