import React from 'react';
import * as utils from '../../utils';
import ContactView from '../presentation/ContactView';
import '../../styling/Contact.css';

export default class Contact extends React.Component {
  state = {
    modal: false
  }
  onSubmit = (e) => {
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
  popUp = () => {
    this.setState({ modal: true });
    setTimeout(() => this.setState({ modal: false }), 2000);
  }
  render() {
    return (
      <ContactView 
        setRef={this.props.setRef}
        popUp={this.popUp}
        onSubmit={this.onSubmit}
        modal={this.state.modal}
      />
    );
  }
}