import React, { useEffect, useRef } from "react";
import "./ServicePage.css";
import Webcam from "react-webcam";
import { Button } from "../../components/ButtonElement";
import {
  InfoContainer,
  Column1,
  BtnWrap,
  InfoRow,
  InfoWrapper,
  ImgWrap,
  Column2,
  TextWrapper,
  TopLine,
  Subtitle,
  Heading,
} from "../../components/InfoSections/InfoElements";
import { HiUpload } from "react-icons/hi";
import { useState } from "react";

const clicked = () => {
  console.log("Clicked Button");
};

const ServicesPage = ({
  lightBg,
  id,
  imgStart,
  topLine,
  lightText,
  headline,
  darkText,
  description,
  buttonLabel,
  img,
  alt,
  primary,
  dark,
  dark2,
  headingColor,
  endPoint,
}) => {
  // const FPS = 5;
  // const WS_URL = "ws://localhost:8000/get_attributes";
  // const webcamRef = useRef(null);
  // const [rec, setRec] = useState();
  // const handleRec = (rec) => {
  //   setRec(rec);
  // };
  // const capture = () => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   return imageSrc;
  // };
  // const scroll = (direction) => {
  //   if (direction === "0") {
  //     globalThis.window.scrollTo({
  //       top: globalThis.window.scrollY + 100,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   } else if (direction === "1") {
  //     globalThis.window.scrollTo({
  //       top: globalThis.window.scrollY - 100,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   } else {
  //   }
  // };
  // useEffect(() => {
  //   const ws = new WebSocket(WS_URL);
  //   ws.onopen = () => {
  //     console.log(`Connected to ${WS_URL}`);
  //     setInterval(() => {
  //       ws.send(capture());
  //     }, 1000 / FPS);
  //   };
  //   let rec = -1;
  //   ws.onmessage = (msg) => {
  //     // console.log(msg);
  //     // console.log(typeof msg.data);
  //     let prev = rec;
  //     // console.log(JSON.parse(msg.data)['gesture'])
  //     rec = JSON.parse(msg.data);
  //     console.log(`Gesture is ${rec}`);
  //     console.log(rec.type);
  //     handleRec(rec);
  //     // if (prev === rec) {

  //     // console.log('Previous equal rec');
  //     // } else {
  //     // console.log(rec)
  //     // console.log(prev)
  //     // console.log('Previous not equal rec');
  //     // }
  //   };
  // }, []);
  // Attribute Extractor 
  const webcamRef = React.useRef(null);
    const videoConstraints = {
      width : 700,
      height : 500,
      facingMode: 'user'
    };
    const[name, setName] = useState('')
    const [res,setRes]=useState()
    const[res2,setRes2]=useState()
    const handleRes=(res,res2)=>{
      setRes(res);
      setRes2(res2);
    }
    // const[disease,setDisease]=useState(' ')
    const login = async () => {
      const imageSrc = webcamRef.current.getScreenshot();
      const post_options={
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({'img':imageSrc})
      }
      console.log(post_options)
      try {
      let res=await fetch('http://127.0.0.1:8000/get_race', post_options)
      res=await res.json()
      //Devansh Backend For Age and Gender Estimation
      let res2=await fetch('http://127.0.0.1:8000/get_age_gender', post_options)
      res2=await res2.json()
      // res= await JSON.parse(res)

      console.log("Type of data is ",typeof(res))
      console.log("Dominant Race is ",res["dominant_race"])
      console.log("Gender is ",res2["gender"])
      console.log("Gender is ",res2["age"])
      handleRes(res,res2)
      } catch (error) {
        console.log("Error is ",error)
      }
      let gender="male";
      let age="22";
      let ethinicity="indian"
            
    }
  return (
    <>
      <InfoContainer lightBg={true} className="bg">
        <InfoWrapper imgStart={true}>
          <div className="headings">Facial Atrribute Classifier</div>
          <InfoRow>
            <Column1>
              <ImgWrap>
                <div className="container">
                  <Webcam
                    className="video"
                    audio={false}
                    ref={webcamRef}
                    height={100}
                    width={100}
                    screenshotFormat="image/jpeg"
                  />
                  <Button primary="true" className="btn" onClick={login}>
                    Find{" "}
                  </Button>
                </div>
              </ImgWrap>
              <BtnWrap></BtnWrap>
            </Column1>
            <Column2>
              <TextWrapper>
                <TopLine>Gender</TopLine>
                <Subtitle className="Desc">{res2&&res2["gender"]}</Subtitle>
                <TopLine>Ethinicity</TopLine>
                <Subtitle className="Desc">{res&&res["dominant_race"]}</Subtitle>
                <TopLine>Age Group</TopLine>
                <Subtitle className="Desc"> {res2&&res2["age"]}</Subtitle>
              </TextWrapper>
            </Column2>
          </InfoRow>
        </InfoWrapper>
      </InfoContainer>
    </>
  );
};

export default ServicesPage;

// import Webcam from 'react-webcam';

// import React, { useEffect, useRef } from 'react';

// function Video() {
//   const FPS = 5;
//   const WS_URL = 'wss://reachoutgestureapi-production.up.railway.app/get_gesture';
//   const webcamRef = useRef(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     return imageSrc;
//   };
//   const scroll = (direction) => {
//     if (direction === '0') {
//       globalThis.window.scrollTo({
//         top: globalThis.window.scrollY + 100,
//         left: 0,
//         behavior: 'smooth',
//       });
//     } else if (direction === '1') {
//       globalThis.window.scrollTo({
//         top: globalThis.window.scrollY - 100,
//         left: 0,
//         behavior: 'smooth',
//       });
//     }
//     else {

//     }
//   };
//   useEffect(() => {
//     const ws = new WebSocket(WS_URL);
//     ws.onopen = () => {
//       console.log(`Connected to ${WS_URL}`);
//       setInterval(() => {
//         ws.send(capture());
//       }, 1000 / FPS);
//     };
//     let rec = -1;
//     ws.onmessage = (msg) => {
//       // console.log(msg);
//       // console.log(typeof msg.data);
//       let prev = rec;
//       // console.log(JSON.parse(msg.data)['gesture'])
//       rec = JSON.parse(msg.data)['gesture'];
//       console.log(rec);
//       console.log(rec.type);
//       // if (prev === rec) {
//       scroll(rec);
//       // console.log('Previous equal rec');
//       // } else {
//       // console.log(rec)
//       // console.log(prev)
//       // console.log('Previous not equal rec');
//       // }
//     };
//   }, []);
//   return (
//     <div class="floating-videoCam" id="flip-horizontal">
//       <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
//     </div>
//   );
// }

// export default Video;
