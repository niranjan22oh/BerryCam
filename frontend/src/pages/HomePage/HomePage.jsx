import React, { useState } from 'react'
import Navbar from "../../components/Navbar"
import SideBar from '../../components/SideBar'
import HeroSection from '../HeroSection';
import InfoSection from '../../components/InfoSections';
import { homeObjOne, homeObjThree, homeObjTwo } from '../../components/InfoSections/Data';
const HomePage = () => {
  const [isopen,setIsOpen]=useState(false);
 const toggle=()=>{
  setIsOpen(!isopen);
 }
  return (
    <>
    <SideBar isopen={isopen} toggle={toggle}/>
    <Navbar toggle={toggle}/>
    <HeroSection/>
    
    <InfoSection {...homeObjOne} />
    <InfoSection {...homeObjTwo} />
    <InfoSection {...homeObjThree} />
    </>
  )
}

export default HomePage
