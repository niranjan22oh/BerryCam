import React from "react";
import "./About.css";
import rsvp from "./../../images/AboutPhotos/rsvp.jpeg";
import { data } from "./data";
const AboutPage = () => {
  return (
    <div className="wrapper">
      <div className="heading">Meet Our Team</div>
      <div className="holder">
        {/* <div className="card">
            <div className="name">RSVP</div>
            <img src={rsvp} className="image" />
            <p className="role">Man United Fan</p>
          </div> */}
        {data.map((ele) => {
          return (
            <div className="card">
              <div className="name">{ele.name}</div>
              <img src={ele.image} className="image" />
              <div className="role">{ele.role}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutPage;
