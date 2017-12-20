import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Header from './Header';
import TitleBar from './TitleBar';
import About from './About';
import Portfolio from './Portfolio';
import logo from './logo.svg'; 
import './App.css';

// Title Bar
// About
// Portfolio
// Skills
// Resume
// Contact


class App extends Component {
  constructor() {
    super();
    this.findAbout = this.findAbout.bind(this);
    this.findPortfolio = this.findPortfolio.bind(this);
  }
  findAbout() {
    return findDOMNode(this.refs['About']).getClientRects();
  }
  findPortfolio() {
    return findDOMNode(this.refs['Portfolio']).getClientRects();
  }
  render() {
    return (
      <div className="App">
        <Header />
        <TitleBar findAbout={this.findAbout} findPortfolio={this.findPortfolio} />
        <div className="main-content">
        <About ref="About"/>
        <Portfolio ref="Portfolio"/>       
        </div>
      </div>
    );
  }
}

export default App;
