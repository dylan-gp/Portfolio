import React from 'react';
import * as utils from './utils';
import './Contact.css';

export default class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      modal: false
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.popUp = this.popUp.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const msg = {
      to: 'dys2@pitt.edu',
      from: e.target.elements['email'].value,
      subject: e.target.elements['subject'].value,
      text: `${e.target.elements['message'].value} \n\n message from ${e.target.elements['name'].value}`,
      html: `<strong>${e.target.elements['message'].value} \n\n message from ${e.target.elements['name'].value}</strong>`,
    };
    utils.sendEmail(msg);
    e.target.elements['email'].value = e.target.elements['subject'].value = 
    e.target.elements['message'].value = e.target.elements['name'].value = '';
    this.popUp();
  }

  popUp() {
    this.setState({ modal: true });
    setTimeout(() => this.setState({ modal: false }), 2000);
  }

  render() {
    return (
      <div className="about-container" >
        <h1 className="about-title">contactForm</h1>
        <form className="contact-form" onSubmit={(e) => this.onSubmit(e)}>
          <ul name="list" className="contact-list">
            <li>
              <p>Your Name</p>
              <input type="text" name="name" required={true} className="contact-text-input"/>
            </li>
            <li>
              <p>Your Email</p>
              <input type="email" name="email" required={true} className="contact-text-input"/>
            </li>
            <li>
              <p>Subject</p>
              <input type="text" name="subject" className="contact-text-input"/>
            </li>
            <li>
              <p>Your Message</p>
              <textarea type="text" name="message" required={true} rows="10" className="contact-textarea"/>
            </li>
          </ul>
          <button type="submit" className="submit-btn" >Submit</button>
        </form>
        <div className={this.state.modal ? "show-modal" : "hide-modal"}><p className="modal-text">Message has been sent</p></div>
      </div>
    )
  }
}