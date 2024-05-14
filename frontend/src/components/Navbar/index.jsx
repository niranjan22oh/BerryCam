import React from 'react'
import {Link as LinkR} from 'react-router-dom'
import {Nav,NavbarContainer,NavLogo,LogoImg,MobileIcon,NavMenu,NavItem,NavLinks,NavBtn,NavBtnLink} from "./NavbarElements"
import logo from "./../../images/NavbarLogo.png"
import {FaBars} from 'react-icons/fa'
const Navbar = ({toggle}) => {
  return (
   <>
   <Nav>
    <NavbarContainer>
        <NavLogo to="/" > <LogoImg src={logo}/> Berry Cam </NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
        <NavItem>
          <NavLinks to="about">About</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="services">Services</NavLinks>
        </NavItem>
        <NavItem>
          <NavLinks to="attendnace">Utilities</NavLinks>
        </NavItem>
        
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/attendance">Lets Begin</NavBtnLink>
        </NavBtn>
    </NavbarContainer>
   </Nav>
   </>
  )
}

export default Navbar
