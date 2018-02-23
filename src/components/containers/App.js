import React, { Component } from 'react';
import AppView from '../presentation/AppView';

export default class App extends Component {
  state = {
    show: false
  }
  componentDidMount() {
    window.addEventListener('scroll', this.addComponent);
  }
  componentWillUnMount() {
    window.removeEventListener('scroll', this.addComponent);
  }

  addComponent = () =>
    window.scrollY >= 700 ? this.setState({show: true}) : this.setState({show: false});

  findComponent = refName =>
    this[refName].getClientRects();

  setRef =
    name =>
      element => 
        this[name] = element;

  render = () =>
    <AppView 
      findComponent={this.findComponent}
      setRef={this.setRef}
    />
}
