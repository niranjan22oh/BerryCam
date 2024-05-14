import React from 'react'
import { 
    SideBarContainer,
    ClosedIcon,Icon,
    SidebarLink,
    SidebarMenu,
    SidebarRoute,
    SideBtnWrap,
    SidebarWrapper } from './SideBarElements'
const SideBar = ({isopen,toggle}) => {
  return (
    <>
    <SideBarContainer isopen={isopen} onClick={toggle}>
        <Icon onClick={()=>{
            console.log(`${isopen}`)
            toggle}}>
            <ClosedIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="about">About</SidebarLink>
                <SidebarLink to="services">Services</SidebarLink>
                <SidebarLink to="/login">Login</SidebarLink>

            </SidebarMenu>
            
            
           <SideBtnWrap>
            <SidebarRoute to="/signin">Sign In</SidebarRoute>
           </SideBtnWrap>
        </SidebarWrapper>
    </SideBarContainer>
    </>
  )
}

export default SideBar
