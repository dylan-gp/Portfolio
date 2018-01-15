import React from 'react';
import './TitleBar.css';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
    this.titleBarFix = this.titleBarFix.bind(this);
    this.moveToAbout = this.moveToAbout.bind(this);
    this.moveToPortfolio = this.moveToPortfolio.bind(this);
    this.moveToContact = this.moveToContact.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.titleBarFix);
  }
  componentWillUnMount() {
    window.removeEventListener('scroll', this.titleBarFix);
  }
  titleBarFix() {
    this.marker.getBoundingClientRect().top < -10 ?
      this.marker.getBoundingClientRect().top < -80 ? 
      this.titlebar.className = "titlebar-container-fix-fade" :
      this.titlebar.className = "titlebar-container-fix" :
      this.titlebar.className = "titlebar-container-fix-hide";
  }
  moveToAbout() {
    window.scrollTo(0, window.scrollY + this.props.findAbout()[0].y + 5);
  }
  moveToPortfolio() {
    window.scrollTo(0, window.scrollY + this.props.findPortfolio()[0].y + 5);
  }
  moveToContact() {
    window.scrollTo(0, window.scrollY + this.props.findContact()[0].y + 5);
  }
  render() {
    return (
      <div>
      <div ref={(div) => this.marker = div} className="titlebar-container">
        <ul className="titlebar-list">
          <li onClick={this.moveToAbout} className="titlebar-item">About</li>
          <li onClick={this.moveToPortfolio} className="titlebar-item">Portfolio</li>
          <li onClick={this.moveToContact} className="titlebar-item">Contact</li>
        </ul>
        </div>
        <div ref={(div) => this.titlebar = div} className="titlebar-container-fix-hide">
        <ul className="titlebar-list">
          <li onClick={this.moveToAbout} className="titlebar-item-fix">About</li>
          <li onClick={this.moveToPortfolio} className="titlebar-item-fix">Portfolio</li>
          <li onClick={this.moveToContact} className="titlebar-item-fix">Contact</li>
        </ul>
        </div>
      </div>
    )
  }
}