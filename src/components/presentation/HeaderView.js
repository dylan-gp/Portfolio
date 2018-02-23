import React from 'react';
import Particles from 'react-particles-js';
import linkedinLogo from '../../images/In-White-128px-TM.png';
import githubLogo from '../../images/GitHub-Mark-Light-120px-plus.png';
import arrow from '../../images/59691.png';
import '../../styling/Header.css';


export default (props) => (
  <div className="header" ref={props.setHeaderRef} >

    <Particles
      params={{
        particles: {
          number: {
            value: 80
          },
          line_linked: {
            shadow: {
              enable: false,
              color: "#3CA9D1",
              blur: 5
            }
          }
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4
            }
          }
        }
    }}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }}/>

    <div className="header-titles">
      <HeaderTitle
        title="Full Stack"
        hide={props.state.hide}
      />
      <HeaderTitle
        title="Software Engineer/Web Developer"
        hide={props.state.hide}
      />
      <h2 
        className="header-hello"
      >
        {props.state.hello}
      </h2>
    </div>
    <img 
      className={props.state.arrow ? "arrow" : "arrow-none"}
      alt="down arrow"
      src={arrow}
    />
    <div className="header-links">
      <HeaderLink
        link="https://www.linkedin.com/in/dylanscheidt"
        name="linkedin"
        logo={linkedinLogo}
      />
      <HeaderLink
        link="https://github.com/dys2"
        name="github"
        logo={githubLogo}
      />
    </div>
  </div>
);

const HeaderTitle = (props) => (
  <h1 
    className = 
    {
      props.hide ? 
      "header-title-none" : 
      "header-title"
    }
  >
    {props.title}
  </h1>
);

const HeaderLink = (props) => (
  <a
    href={props.link}
    rel="noopener noreferrer"
    target="_blank"
  >
    <img
      className="header-icon"
      alt={props.name}
      src={props.logo}
    />
  </a>
);