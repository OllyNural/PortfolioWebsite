import React from 'react';

import './ContactForm.css';

export default class ContactForm extends React.Component {
  render() {
    return (
      <form id="v1-contact-form" onSubmit={this.props.handleSubmit}>
        <div>
          <input className="v1-form-input" id="v1-form-name" placeholder=" " type="text" value={this.props.name} onChange={(evt) => this.props.handleChange(evt, 'name')} required />
          <label className="v1-form-label" htmlFor="form-name">Your name</label>
        </div>
        <div>
          <input className="v1-form-input v1-email-input" id="v1-form-email" placeholder=" " type="email" value={this.props.email} onChange={(evt) => this.props.handleChange(evt, 'email')} required />
          <label className="v1-form-label" htmlFor="form-email">Your email</label>
          <div className="requirements">
            Please enter a valid email address.
          </div>
        </div>
        <div>
          <textarea className="v1-form-input" id="v1-form-message" placeholder=" " type="text" value={this.props.message} onChange={(evt) => this.props.handleChange(evt, 'message')} required />
          <label className="v1-form-label" htmlFor="form-message">Message away!</label>
        </div>
        <input className="v1-submit-button" type="submit" value="SUBMIT" />
      </form>
    )
  }
}