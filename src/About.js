import React from 'react';
import './About.css';
import mypicture from "./mypicture.jpg";

export default () => (
  <div className="about-container">
    <h1 className="about-title">aboutDylan</h1>
    <img className="about-pic" src={mypicture} />
    <div className="about-row">
      <div className="about-row-item">
        <h2 className="about-item-title">I'm Dylan Scheidt, an aspiring software engineer</h2>
        <h3 className="about-item-subtitle-left">I've always had a love for all things tech.  My passion lies in building things and finding optomized solutions.</h3>
      </div>
      <div className="about-row-item" >
        <h3 className="about-item-title">What I Do</h3>
        <h4 className="about-item-subtitle">Languages</h4>
        <p className="about-item-text">Javascript, ES6, C/C++</p>
        <h4 className="about-item-subtitle">Front End</h4>
        <p className="about-item-text">React, CSS3, HTML5</p>
        <h4 className="about-item-subtitle">Back End</h4>
        <p className="about-item-text">NodeJS, MongoDB, APIs, Cloud, Deployment</p>
        <h4 className="about-item-subtitle">Mobile</h4>
        <p className="about-item-text">React Native</p>
      </div>
    </div>
  </div>
)