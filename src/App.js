import React, { Component } from 'react';
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
  render() {
    return (
      <div className="App">
        <Header />
        <TitleBar />
        <div className="main-content">
        <About />
        <Portfolio />       
        </div>
      </div>
    );
  }
}

export default App;
