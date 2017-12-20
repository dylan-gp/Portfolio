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
      codersCode: false
    }
    this.scroll = this.scroll.bind(this);
    this.popUp = this.popUp.bind(this);
    this.popDown = this.popDown.bind(this);
  };

  popUp(piece) {
    if (piece === 'coders') this.setState({ codersCode: true });
  }

  popDown(piece) {
    if (piece === 'coders') this.setState({ codersCode: false });
  }

  scroll(boo) {
    this.interval = setInterval(() => boo ? this.list.scrollLeft++ : this.list.scrollLeft--, 1);
  }

  unscroll() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className="about-container">
        <h1 className="about-title">dylansPortfolio</h1>
        <ul ref={(ul) => this.list = ul } className="portfolio-list">
          <img className="scroll-arrow-left" onMouseDown={() => this.scroll(true)} onMouseUp={() => this.unscroll()} src={arrow} />
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
          <img className="scroll-arrow-right" onMouseDown={() => this.scroll(false)} onMouseUp={() => this.unscroll()} src={arrow} />
        </ul>
      </div>
    )
  }
}