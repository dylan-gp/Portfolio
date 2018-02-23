import React from 'react';
import '../../styling/About.css';
import mypicture from "../../images/mypicture.jpg";

export default (props) => (
  <div className="about-container" ref={props.setRef} >
    <h1 className="about-title">aboutDylan</h1>
    <div className="about-pic-container">
      <img className="about-pic" src={mypicture} alt="Dylan"/>
    </div>
    <div className="about-row">
      <div className="about-row-item">
        <h2 className="about-item-title">
          I'm Dylan Scheidt, software engineer
        </h2>
        <h3 className="about-item-subtitle-left">
          I've always had a love for all things tech.  
          My passion lies in building things and finding optimized solutions.
        </h3>
      </div>
      <div className="about-row-item" >
        <h3 className="about-item-title">What I Do</h3>
        {aboutText.map(
          item => 
            <AboutTextItem
              category={item.category}
              text={item.text}
            />
        )}
      </div>
    </div>
  </div>
);


const AboutTextItem = (props) => (
  <React.Fragment>
    <h4 className="about-item-subtitle">{props.category}</h4>
    <p className="about-item-text">{props.text}</p>
  </React.Fragment>
);

const aboutText = [
  {
    category: 'Languages',
    text: 'Javascript, ES6, C/C++'
  },
  {
    category: 'Front End',
    text: 'React, Redux, CSS3, HTML5, ThreeJS, SASS'
  },
  {
    category: 'Back End',
    text: 'NodeJS, MongoDB, APIs, Cloud, Deployment'
  }
];

