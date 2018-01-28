import React from 'react';
import Particles from 'react-particles-js';
import linkedinLogo from './images/In-White-128px-TM.png';
import githubLogo from './images/GitHub-Mark-Light-120px-plus.png';
import arrow from './images/59691.png';
import './Header.css';



export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      arrow: false,
      hello: "",
      particle: true,
    }
    this.helloWorld = "Hello World";
    this.hideTitle = this.hideTitle.bind(this);
    this.arrowFlash = this.arrowFlash.bind(this);
    this.writeHello = this.writeHello.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.hideTitle);
    const element = document.getElementById('loader');
    const bounce1 = document.getElementById('bounce1');
    const bounce2 = document.getElementById('bounce2');
    const bounce3 = document.getElementById('bounce3');
    if(element){
      setTimeout(() => {
        setTimeout(() => element.classList.add('available'), 500);
        bounce1.classList.add('final-bounce');
        bounce2.classList.add('final-bounce');
        bounce3.classList.add('final-bounce');
        document.body.classList.remove('no-scroll');
        setTimeout(() => this.setState({ hide: false }), 2000);
        this.writeHello();
        setTimeout(() => this.interval = setInterval(() => this.arrowFlash(), 1200), 3500);
        setTimeout(() => {
          element.parentNode.removeChild(element);     
        }, 2000)
      }, 4000);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideTitle);
    clearInterval(this.interval);
  }
  hideTitle() {
    window.scrollY > 0 ?
      !this.state.hide ? this.setState({ hide: true }) : null:
      this.state.hide ? this.setState({ hide: false }) : null;
    if (this.header.getBoundingClientRect().bottom <= 20 && this.state.hello === "Hello World") this.setState({ hello: "Hello Again" });
    if (window.scrollY >= 700) clearInterval(this.interval);
  }
  arrowFlash() {
    this.setState({ arrow: !this.state.arrow });
  }
  writeHello() {
    setTimeout(() => {
      const int = setInterval(() => {
        this.setState({hello: `${this.state.hello}${this.helloWorld.slice(0, 1)}`});
        this.helloWorld = this.helloWorld.slice(1);
        if (this.helloWorld.length === 0) clearInterval(int);
      }, 100);
    }, 2500);
  }
  render() {
    return (
      <div className="header" ref={(div) => this.header = div} >
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
          <h1 className={this.state.hide ? "header-title-none" : "header-title"}>Full Stack</h1>
          <h1 className={this.state.hide ? "header-title-none" : "header-title"}>Software Engineer/Web Developer</h1>
          <h2 className="header-hello">{this.state.hello}</h2>
        </div>
        <img className={this.state.arrow ? "arrow" : "arrow-none"} alt="down arrow" src={arrow} />
        <div className="header-links">
          <a href="https://www.linkedin.com/in/dylanscheidt" rel="noopener noreferrer" target="_blank" >
            <img className="header-icon" alt="linkedin" src={linkedinLogo} />
          </a>
          <a href="https://github.com/dys2" rel="noopener noreferrer" target="_blank" >
            <img className="header-icon" alt="github" src={githubLogo} />
          </a>
        </div>
      </div>
    )
  }
}
