import React from 'react';
import '../styling/TitleBar.css';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
  }
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
  render() {
    return (
      <React.Fragment>
        <TitleBarItem
          divClass="titlebar-container"
          liClass="titlebar-item"
          moveToComponent={this.moveToComponent}
          setRef={this.setRef('marker')}
        />
        <TitleBarItem
          divClass="titlebar-container-fix-hide"
          liClass="titlebar-item-fix"
          moveToComponent={this.moveToComponent}
          setRef={this.setRef('titlebar')}
        />
      </React.Fragment>
    )
  }
}

const TitleBarItem = (props) => (
  <div ref={props.setRef} className={props.divClass}>
    <ul className="titlebar-list">
      {titleBarList.map(name =>
        <TitleBarListItem 
          name={name}
          liClass={props.liClass}
          moveToComponent={props.moveToComponent}
        />
      )}
    </ul>
  </div>
);

const TitleBarListItem = (props) => (
  <li
    onClick={() => props.moveToComponent(props.name)}
    className={props.liClass}
  >
    {props.name}
  </li>
);

const titleBarList = ['About', 'Portfolio', 'Contact'];