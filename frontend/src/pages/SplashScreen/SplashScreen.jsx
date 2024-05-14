import React, { useEffect, useState } from 'react';
import './SplashScreen.css'; // Import your CSS file for styling
import logo from './logo.png'; // Import your logo image

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Set the timeout duration (in milliseconds)

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${loading ? 'active' : ''}`}>
      <div className="circle"></div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="ripple"></div>
      <div className="ripple delay"></div>
      <div className="ripple delay"></div>
      <h1>Loading...</h1>
    </div>
  );
};

export default SplashScreen;
