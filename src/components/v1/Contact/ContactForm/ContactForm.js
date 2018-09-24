import React from 'react';

import './ContactForm.css';

export default class ContactForm extends React.Component {
  render() {
    return (
      <form id="contact-form" onSubmit={this.props.handleSubmit}>
        <div>
          <input className="form-input" id="form-name" placeholder=" " type="text" value={this.props.name} onChange={(evt) => this.props.handleChange(evt, 'name')} required />
          <label className="form-label" htmlFor="form-name">Your name</label>
        </div>
        <div>
          <input className="form-input email-input" id="form-email" placeholder=" " type="email" value={this.props.email} onChange={(evt) => this.props.handleChange(evt, 'email')} required />
          <label className="form-label" htmlFor="form-email">Your email</label>
          <div className="requirements">
            Please enter a valid email address.
          </div>
        </div>
        <div>
          <textarea className="form-input" id="form-message" placeholder=" " type="text" value={this.props.message} onChange={(evt) => this.props.handleChange(evt, 'message')} required />
          <label className="form-label" htmlFor="form-message">Message away!</label>
        </div>
        <input className="submit-button" type="submit" value="SUBMIT" />
      </form>
    )
  }
}