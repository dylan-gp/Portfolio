import React from 'react';
import mypicture from './mypicture.jpg';
import linkedinLogo from './In-White-128px-TM.png';
import githubLogo from './GitHub-Mark-Light-120px-plus.png';
import arrow from './59691.png';
import './Header.css';



export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      arrow: false
    }
    this.hideTitle = this.hideTitle.bind(this);
    this.arrowFlash = this.arrowFlash.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.hideTitle);
    this.interval = setInterval(() => this.arrowFlash(), 1200);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideTitle);
    clearInterval(this.interval);
  }

  hideTitle() {
    window.scrollY > 0 ?
      !this.state.hide ? this.setState({ hide: true }) : null:
      this.state.hide ? this.setState({ hide: false }) : null;
  }

  arrowFlash() {
    if (window.innerWidth <= 800 && this.state.arrow) {
      this.setState({ arrow: false });
      return;
    }
    if (window.innerWidth > 800) this.setState({ arrow: !this.state.arrow });
  }
  
  render() {
    return (
      <div className="header" >
        <div className="header-titles">
          <h1 className={this.state.hide ? "header-title-none" : "header-title"}>Full Stack</h1>
          <h1 className={this.state.hide ? "header-title-none" : "header-title"}>Software Engineer/Web Developer</h1>
        </div>
        <img className={this.state.arrow ? "arrow" : "arrow-none"} src={arrow} />
        <div className="header-links">
          <a href="https://www.linkedin.com/in/dylanscheidt">
            <img className="header-icon" src={linkedinLogo} />
          </a>
          <a href="https://github.com/dys2" >
            <img className="header-icon" src={githubLogo} />
          </a>
        </div>
      </div>
    )
  }

}
