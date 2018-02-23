import React from 'react';

export default (props) => (
  <div className="about-container" ref={props.setRef}>
    <h1 className="about-title">contactForm</h1>
    <form className="contact-form" onSubmit={props.onSubmit}>
      <ul name="list" className="contact-list">
        {
          contactInfo
            .map(
              input =>
                <ContactListItem text={input.text}>
                  {input.child}
                </ContactListItem>
            )
        }
      </ul>
      <button type="submit" className="submit-btn" >Submit</button>
    </form>
    <div className={props.modal ? "show-modal" : "hide-modal"}>
      <p className="modal-text">Message has been sent</p>
    </div>
  </div>
);

const ContactListItem = (props) => (
  <li>
    <p>{props.text}</p>
    {props.children}
  </li>
);

const contactInfo = [
  {
    text: "Your Name",
    child: 
      <input
        type="text"
        name="name"
        required={true}
        className="contact-text-input"
      />
  },
  {
    text: "Your Email",
    child:
      <input
        type="email"
        name="email"
        required={true}
        className="contact-text-input"
      />
  },
  {
    text: "Subject",
    child:
      <input
        type="text"
        name="subject"
        className="contact-text-input"
      />
  },
  {
    text: "Your Message",
    child:
      <textarea
        type="text"
        name="message"
        required={true}
        rows="10"
        className="contact-textarea"
      />
  }
];