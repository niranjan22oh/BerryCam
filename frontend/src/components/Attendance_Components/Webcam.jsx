import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
const Webcam=({ lastFrame, setLastFrame })=> {
    videoRef = useRef(null);
    canvasRef = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);
  
    useEffect(() => {
      const setupCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      };
      if (!isStreaming) {
        setupCamera();
      }
    }, [isStreaming]);
  
    useEffect(() => {
      if (isStreaming) {
        context = canvasRef.current.getContext("2d");
        context.drawImage(videoRef.current, 0, 0, 400, 300);
  
        requestAnimationFrame(() => {
          setTimeout(() => {
            context.drawImage(videoRef.current, 0, 0, 400, 300);
  
            canvasRef.current.toBlob((blob) => {
              setLastFrame(URL.createObjectURL(blob));
              lastFrame = blob.slice(); // Your edition here
            });
          }, 33);
        });
      }
    }, [isStreaming]);
  
    return (
      <div className="webcam">
        <canvas ref={canvasRef} width={400} height={300} />
        <video ref={videoRef} autoPlay playsInline />
      </div>
    );
  }