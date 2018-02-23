import React from 'react';
import '../../styling/TitleBar.css';

export default (props) => (
  <React.Fragment>
    <TitleBarItem
      divClass="titlebar-container"
      liClass="titlebar-item"
      moveToComponent={props.moveToComponent}
      setRef={props.setRef('marker')}
    />
    <TitleBarItem
      divClass="titlebar-container-fix-hide"
      liClass="titlebar-item-fix"
      moveToComponent={props.moveToComponent}
      setRef={props.setRef('titlebar')}
    />
  </React.Fragment>
);

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