import React from 'react';
import './Contact.css';

export default class Contact extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="about-container" >
        <h1 className="about-title">contactForm</h1>
        <form>
          <ul className="contact-list">
            <li>
              <p>Your Name</p>
              <input type="text" className="contact-text-input"/>
            </li>
            <li>
              <p>Your Email</p>
              <input type="email" className="contact-text-input"/>
            </li>
            <li>
              <p>Subject</p>
              <input type="text" className="contact-text-input"/>
            </li>
            <li>
              <p>Your Message</p>
              <textarea type="text" rows="20" className="contact-textarea"/>
            </li>
          </ul>
        </form>
      </div>
    )
  }
}