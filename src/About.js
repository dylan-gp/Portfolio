import React from 'react';
import './About.css';
import mypicture from "./mypicture.jpg";

export default () => (
  <div className="about-container">
    <h1 className="about-title">About Me</h1>
    <img className="about-pic" src={mypicture} />
    <p className="about-text">Dylan Scheidt</p>
    <p className="about-text">Aspiring software engineer with a love for all things tech.  Passion for building things and challenging algorithms.</p>
    <p className="about-text">University of Pitt Grad {"&&"} Currently Attending Lambda School</p>
  </div>
)