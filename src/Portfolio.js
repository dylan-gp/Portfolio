import React from 'react';
import Piece from './Piece';
import CodersCodeImg from './CodersCode.png';
import CodersCodeClientImg from './CodersCodeClient.png';
import CodersCodeAPIImg from './CodersCodeAPI.png';
import ZoomToYoutube from './ZoomToYoutube.png';
import ZoomToYoutube2 from './ZoomToYoutube2.png';
import arrow from './arrow.svg';

import './Portfolio.css';


export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codersCode: false,
      hideLeft: true,
      hideRight: false,
      currentText: '',
      size: window.matchMedia("screen and (max-width: 500px)").matches ? .80 : .48
    }
    this.scroll = this.scroll.bind(this);
    this.popUp = this.popUp.bind(this);
    this.popDown = this.popDown.bind(this);
    this.arrowVisibility = this.arrowVisibility.bind(this);
    this.resize = this.resize.bind(this);
    this.codersCodeText = "The Coders Code";
    this.notAvail = "N/A Yet"
    this.fillText = this.fillText.bind(this);
    this.stopText = this.stopText.bind(this);
  };

  componentDidMount() {
    this.list.addEventListener('scroll', this.arrowVisibility);
    window.addEventListener('resize', this.resize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  popUp(piece) {
    if (piece === 'coders') {
      this.setState({ codersCode: true });
      // document.body.classList.add('no-scroll');
    }
  }

  popDown(piece) {
    if (piece === 'coders') {
      this.setState({ codersCode: false });
      // document.body.classList.remove('no-scroll');
    }
  }

  resize() {
    const prev = this.state.size;
    this.setState({size: window.matchMedia("screen and (max-width: 500px)").matches ? .80 : .48});
    if (prev !== this.state.size) this.list.scrollLeft = 0;

  }
  arrowVisibility() {
    const width = window.innerWidth * this.state.size;
    if (this.list.scrollLeft === 0 && !this.state.hideLeft) this.setState({ hideLeft: true });
    if (this.list.scrollLeft > 0 && this.state.hideLeft) this.setState({ hideLeft: false });
    if (this.list.scrollLeft >= Math.floor(width * 2) && !this.state.hideRight) this.setState({ hideRight: true });
    if (this.list.scrollLeft < Math.floor(width * 2) && this.state.hideRight) this.setState({ hideRight: false });
  }
  scroll(boo) {
    const width = Math.round(window.innerWidth * this.state.size);
    boo ? this.list.scrollLeft += width : this.list.scrollLeft -= width;
    // this.interval = setInterval(() => boo ? this.list.scrollLeft += window.innerWidth * .32 : this.list.scrollLeft -= window.innerWidth * .32, 1);
  }

  fillText(text = '') {
    clearInterval(this.int);
    if (!this.i) this.i = 0;
    if (this.state.currentText.length === 0) clearInterval(this.int)
    this.int = setInterval(() => {
      this.setState({currentText: this.state.currentText + text[this.i]});
      this.i++;
      if (this.state.currentText.length === text.length) clearInterval(this.int);
    }, 20);
  }
  stopText() {
    clearInterval(this.int);
    this.int = setInterval(() => {
      if (this.state.currentText === '' || this.state.currentText === undefined || this.state.currentText === 'undefined') {
        clearInterval(this.int);
        this.setState({currentText: ''});
      }
      else {
        this.setState({currentText: this.state.currentText.slice(0, -1)});
        this.i--;
      }
    }, 20);
  }

  unscroll() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="port-container">
        <h1 className="about-title">dylansPortfolio</h1>
        <ul ref={(ul) => this.list = ul } className="portfolio-list">
          <img 
            className={this.state.hideLeft ? "scroll-arrow-left-hide" : "scroll-arrow-left"} 
            onClick={() => this.scroll(false)} src={arrow} 
            alt="go left"
          />
          <li id="coders-code-img">
            <img 
              className="portfolio-img"
              onClick={() => this.popUp('coders')} src={CodersCodeImg}
              onMouseOver={() => this.fillText(this.codersCodeText)}
              onMouseLeave={() => this.stopText()}
              alt="Coders Code"
            />
          </li>
          {this.state.codersCode ? 
            <Piece
              popDown={this.popDown}
              image1={CodersCodeImg}
              image2={CodersCodeClientImg}
              image3={CodersCodeAPIImg} 
              githubClient="https://github.com/dys2/CodersCode"
              githubAPI="https://github.com/dys2/CodersCodeAPI"
              pageLink="http://www.thecoderscode.com/"
            /> : ''}
          <li>
            <img className="portfolio-img" src={ZoomToYoutube} alt="Zoom To Youtube"
            onMouseOver={() => this.fillText(this.notAvail)}
            onMouseLeave={() => this.stopText()}
            />
          </li>
          <li>
            <img className="portfolio-img" src={ZoomToYoutube2} alt="Zoom To Youtube2"
            onMouseOver={() => this.fillText(this.notAvail)}
            onMouseLeave={() => this.stopText()}
            />
          </li>
          <img
            className={this.state.hideRight ? "scroll-arrow-right-hide" : "scroll-arrow-right"}
            onClick={() => this.scroll(true)} src={arrow}
            alt="go right"
            />
        </ul>
        <div className="piece-name-div">
        <h2 className="piece-name" ref={(h2) => this.ccText = h2 } >{this.state.currentText}</h2>
        </div>
      </div>
    )
  }
}