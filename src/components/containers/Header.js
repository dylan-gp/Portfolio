import React from 'react';
import HeaderView from '../presentation/HeaderView';

export default class Header extends React.Component {
  state = {
    hide: true,
    arrow: false,
    hello: "",
    particle: true,
  }
  helloWorld = "Hello World";
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
      }, 3000);
    }
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideTitle);
    clearInterval(this.interval);
  }
  hideTitle = () => {
    window.scrollY > 0 ?
      !this.state.hide ? this.setState({ hide: true }) : null:
      this.state.hide ? this.setState({ hide: false }) : null;
    if (this.header.getBoundingClientRect().bottom <= 20 
      && this.state.hello === "Hello World") 
      this.setState({ hello: "Hello Again" });
    if (window.scrollY >= 700) clearInterval(this.interval);
  }

  arrowFlash = () =>
    this.setState({ arrow: !this.state.arrow });

  writeHello = () =>
    setTimeout(
      () => {
        const int = setInterval(
          () => {
            this.setState(
              {
                hello: `${this.state.hello}${this.helloWorld.slice(0, 1)}`
              }
            );
            this.helloWorld = this.helloWorld.slice(1);
            if (this.helloWorld.length === 0)
              clearInterval(int);
          },
          100
        );
      },
      2500
    );
  
  setHeaderRef = (element) =>
    this.header = element;

  render = () =>
    <HeaderView
      setHeaderRef={this.setHeaderRef}
      state={this.state}
    />;

}