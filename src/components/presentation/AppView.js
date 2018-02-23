import React from 'react';
import Header from '../containers/Header';
import TitleBar from '../containers/TitleBar';
import About from './About';
import MusicAnimation from '../containers/MusicAnimation';
import SpaceAnimation from '../containers/SpaceAnimation';
import Portfolio from './Portfolio';
import Contact from '../containers/Contact';
import Particles from 'react-particles-js';
import '../../styling/App.css';


export default (props) => (
  <div className="App" >

    <div className="background" > 
    </div>

    <Particles 
      params={{
        particles: {
          number: {
            value: 4,
            density: {
            enable: true,
            value_area: 2000
          }
        },
        size: {
          value: 2,
          random: true
        },
        opacity: {
          value: .5,
          random: true
        },
        color: {
          value: "#000000",
        },
        line_linked: {
          shadow: {
            enable: false,
            color: "#4320a0",
            blur: 5
          }
        }
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: {
            enable: true,
            mode: "bubble"
          },
          onclick: {
            enable: true,
            mode: "repulse"
          }
        },
        modes: {
          bubble: {
            distance: 400,
            size: 4,
            duration: 2,
            opacity: 1,
            speed: 0.3
          },
          repulse: {
            distance: 200
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
    }}
    />

    <Particles
      params={{
        particles: {
          number: {
            value: 4,
            density: {
              enable: true,
              value_area: 2000
            }
          },
          size: {
            value: 2,
            random: true
          },
          opacity: {
            value: .5,
            random: true
          },
          color: {
            value: "#4320a0",
          },
          line_linked: {
            shadow: {
                enable: false,
                color: "#4320a0",
                blur: 5
            }
          }
        },
        interactivity: {
          detect_on: "window",
          events: {
            onhover: {
              enable: true,
              mode: "bubble"
            },
            onclick: {
              enable: true,
              mode: "repulse"
            }
          },
          modes: {
            bubble: {
              distance: 400,
              size: 4,
              duration: 2,
              opacity: 1,
              speed: 0.3
            },
            repulse: {
              distance: 200
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
      }}
    />
    
    <Header />
    <TitleBar
      findComponent={props.findComponent}
    /> 
    <div className="main-content">
      <About setRef={props.setRef('About')} />
      <MusicAnimation />  
      <Portfolio setRef={props.setRef('Portfolio')} /> 
      <SpaceAnimation /> 
      <Contact setRef={props.setRef('Contact')} /> 
    </div>
  </div>
);