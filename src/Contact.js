import React from 'react';
import './Contact.css';

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default class Contact extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
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
    sgMail.send(msg);
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
      </div>
    )
  }
}