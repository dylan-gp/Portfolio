import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Header from './Header';
import TitleBar from './TitleBar';
import About from './About';
import Animation from './Animation';
import SecondAnim from './SecondAnim';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Particles from 'react-particles-js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      show: false
    }
    this.findAbout = this.findAbout.bind(this);
    this.findPortfolio = this.findPortfolio.bind(this);
    this.addComponent = this.addComponent.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.addComponent);
  }
  componentWillUnMount() {
    window.removeEventListener('scroll', this.addComponent);
  }
  addComponent() {
    window.scrollY >= 700 ? this.setState({show: true}) : this.setState({show: false});
  }
  findAbout() {
    return findDOMNode(this.refs['About']).getClientRects();
  }
  findPortfolio() {
    return findDOMNode(this.refs['Portfolio']).getClientRects();
  }
  findContact() {
    return findDOMNode(this.refs['Contact']).getClientRects();
  }
  render() {
    return (
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
        }}/>  
                            <Particles params={{
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
                            }}/>  
        <Header />
        <TitleBar findAbout={this.findAbout} findPortfolio={this.findPortfolio} findContact={this.findContact} />
        <div className="main-content">
        
        <About ref="About"/>
        <Animation />
        <Portfolio ref="Portfolio"/>
        <SecondAnim />
        <Contact ref="Contact"/>
        </div>
        
      </div>
    );
  }
}

export default App;
