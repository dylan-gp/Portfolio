import React from 'react';
import Piece from './Piece';
import CodersCodeImg from './CodersCode.png';
import CodersCodeClientImg from './CodersCodeClient.png';
import CodersCodeAPIImg from './CodersCodeAPI.png';
import Todo from './Todo.png';
import Friends from './Friends.png';
import arrow from './arrow.svg';

import './Portfolio.css';


export default class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codersCode: false,
      hideLeft: true,
      hideRight: false
    }
    this.scroll = this.scroll.bind(this);
    this.popUp = this.popUp.bind(this);
    this.popDown = this.popDown.bind(this);
    this.arrowVisibility = this.arrowVisibility.bind(this);
  };

  componentDidMount() {
    this.list.addEventListener('scroll', this.arrowVisibility);
  }

  popUp(piece) {
    if (piece === 'coders') this.setState({ codersCode: true });
  }

  popDown(piece) {
    if (piece === 'coders') this.setState({ codersCode: false });
  }

  arrowVisibility() {
    const width = window.innerWidth * .32;
    if (this.list.scrollLeft === 0 && !this.state.hideLeft) this.setState({ hideLeft: true });
    if (this.list.scrollLeft > 0 && this.state.hideLeft) this.setState({ hideLeft: false });
    if (this.list.scrollLeft >= Math.floor(width * 2) && !this.state.hideRight) this.setState({ hideRight: true });
    if (this.list.scrollLeft < Math.floor(width * 2) && this.state.hideRight) this.setState({ hideRight: false });
  }
  scroll(boo) {
    const width = Math.round(window.innerWidth * .32);
    boo ? this.list.scrollLeft += width : this.list.scrollLeft -= width;
    // this.interval = setInterval(() => boo ? this.list.scrollLeft += window.innerWidth * .32 : this.list.scrollLeft -= window.innerWidth * .32, 1);
  }

  unscroll() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="about-container">
        <h1 className="about-title">dylansPortfolio</h1>
        <ul ref={(ul) => this.list = ul } className="portfolio-list">
          <img className={this.state.hideLeft ? "scroll-arrow-left-hide" : "scroll-arrow-left"} onClick={() => this.scroll(false)} src={arrow} />
          <li>
            <img className="portfolio-img" onClick={() => this.popUp('coders')} src={CodersCodeImg} />
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
            <img className="portfolio-img" src={Todo} />
          </li>
          <li>
            <img className="portfolio-img" src={Friends} />
          </li>
          <img className={this.state.hideRight ? "scroll-arrow-right-hide" : "scroll-arrow-right"} onClick={() => this.scroll(true)} src={arrow} />
        </ul>
      </div>
    )
  }
}