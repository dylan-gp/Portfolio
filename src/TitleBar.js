import React from 'react';
import './TitleBar.css';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="titlebar-container">
        <ul className="titlebar-list">
          <li className="titlebar-item">About</li>
          <li className="titlebar-item">Portfolio</li>
          <li className="titlebar-item">Skills</li>
          <li className="titlebar-item">Resume</li>
        </ul>
      </div>
    )
  }
}