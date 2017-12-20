import React from 'react';
import './TitleBar.css';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.titleBarFix = this.titleBarFix.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.titleBarFix);
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.titleBarFix);
  }

  titleBarFix() {
    this.marker.getBoundingClientRect().top < 0 ?
      this.marker.getBoundingClientRect().top < -40 ? 
      this.titlebar.className = "titlebar-container-fix-fade" :
      this.titlebar.className = "titlebar-container-fix" :
      this.titlebar.className = "titlebar-container-fix-hide";
  }
  render() {
    return (
      <div>
      <div ref={(div) => this.marker = div} className="titlebar-container">
        <ul className="titlebar-list">
          <li className="titlebar-item">About</li>
          <li className="titlebar-item">Portfolio</li>
          <li className="titlebar-item">Skills</li>
          <li className="titlebar-item">Resume</li>
        </ul>
        </div>
        <div ref={(div) => this.titlebar = div} className="titlebar-container-fix-hide">
        <ul className="titlebar-list">
          <li className="titlebar-item">About</li>
          <li className="titlebar-item">Portfolio</li>
          <li className="titlebar-item">Skills</li>
          <li className="titlebar-item">Resume</li>
        </ul>
        </div>
      </div>
    )
  }
}