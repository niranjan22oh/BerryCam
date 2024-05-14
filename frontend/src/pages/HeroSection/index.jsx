import React ,{useState}from 'react'
import { HeroContainer,HeroBg,VideoBg ,HeroContent,HeroH1,HeroP,HeroBtnWrapper,ArrowForward,ArrowRight} from './HeroElements';
import Video from "../../images/bgvideo.mp4"
import { Button } from '../../components/ButtonElement';
const HeroSection = () => {
  const [hover,setHover]=useState(false);
  const onHover=()=>{
    setHover(!hover);
  }
  return (
    <>
    <HeroContainer>
    <HeroBg>
    <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
    </HeroBg>
    <HeroContent>
    <HeroH1>
      Facial Attribute Classifier
    </HeroH1>
    <HeroP>
      Recognises your age ,gender , ethinicity and pose
    </HeroP>
    <HeroBtnWrapper>
      <Button to='/signin' onMouseEnter={onHover} onMouseLeave={onHover} primary="true" dark="false">
      Get Started{hover ? <ArrowForward/> :<ArrowRight/>}
      </Button>
     
    </HeroBtnWrapper>
    </HeroContent>

    </HeroContainer>
    
    </>
  )
}

export default HeroSection
