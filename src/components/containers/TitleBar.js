import React from 'react';
import TitleBarView from '../presentation/TitleBarView';

export default class TitleBar extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.titleBarFix);
  }
  componentWillUnMount() {
    window.removeEventListener('scroll', this.titleBarFix);
  }
  titleBarFix = () => {
    this.marker.getBoundingClientRect().top < -10 ?
      this.marker.getBoundingClientRect().top < -80 ? 
      this.titlebar.className = "titlebar-container-fix-fade" :
      this.titlebar.className = "titlebar-container-fix" :
      this.titlebar.className = "titlebar-container-fix-hide";
  }
  moveToComponent = (compName) =>
    window.scrollTo(
      0,
      window.scrollY + 
      this.props.findComponent(compName)[0].y + 
      5
    );

  setRef = name =>
    element => 
      this[name] = element;
      
  render = () =>
    <TitleBarView 
      setRef={this.setRef}
      moveToComponent={this.moveToComponent}
    />;
}