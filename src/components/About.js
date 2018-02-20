import React from 'react';
import '../styling/About.css';
import mypicture from "../images/mypicture.jpg";

export default class About extends React.Component {
  render() {
    return (
      <div className="about-container">
        <h1 className="about-title">aboutDylan</h1>
        <div className="about-pic-container">
          <img className="about-pic" src={mypicture} alt="Dylan"/>
        </div>
        <div className="about-row">
          <div className="about-row-item">
            <h2 className="about-item-title">I'm Dylan Scheidt, software engineer</h2>
            <h3 className="about-item-subtitle-left">I've always had a love for all things tech.  My passion lies in building things and finding optimized solutions.</h3>
          </div>
          <div className="about-row-item" >
            <h3 className="about-item-title">What I Do</h3>
            <h4 className="about-item-subtitle">Languages</h4>
            <p className="about-item-text">Javascript, ES6, C/C++</p>
            <h4 className="about-item-subtitle">Front End</h4>
            <p className="about-item-text">React, CSS3, HTML5, ThreeJS</p>
            <h4 className="about-item-subtitle">Back End</h4>
            <p className="about-item-text">NodeJS, MongoDB, APIs, Cloud, Deployment</p>
            <h4 className="about-item-subtitle">Mobile</h4>
            <p className="about-item-text">React Native</p>
          </div>
        </div>
      </div>
    )
  }
}

