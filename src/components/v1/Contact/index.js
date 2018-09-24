import React, { Component } from 'react';

import Layout from 'components/v1/Layout/Layout';
import Title from 'components/v1/Layout/Title';

import ContactForm from './ContactForm/ContactForm';

import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      hasEmailSent: JSON.parse(localStorage.getItem('hasEmailSent')) || false
    };
    
    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleFormChange(event, type) {
    if (type === 'name') {
      this.setState({name: event.target.value});
    } else if (type === 'email') {
      this.setState({email: event.target.value});
    } else if (type === 'message') {
      this.setState({message: event.target.value});
    }
  }
  handleSubmit(event) {
    let url = '/api/contact';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        message: this.state.message
      })
    }).then((response) => {
      if (response.status === 200) {
        this.setState({hasEmailSent: true},() => {
          localStorage.setItem('hasEmailSent', JSON.stringify('true'))
        });
      }
    })
    event.preventDefault();
  }
  render() {
    let displayForm;
    if (this.state.hasEmailSent) {
      displayForm = <div className="v1-form-submitted"><h3>Thank you for your message!</h3><p>If your email was valid, then the message will have been sent.</p></div>
    } else {
      displayForm = <ContactForm name={this.state.name} email={this.state.email} message={this.state.message} handleChange={this.handleFormChange} handleSubmit={this.handleSubmit} />
    }
    return (
        <Layout>
          <div className="v1-page-container">
            <div className="v1-contact-container">
              <Title title="Contact Me" />
              <div className="v1-contact-intro-form">
                <div className="v1-contact-text">
                  Feel free to send an email to <a href="mailto:oliver.nural@gmail.com"><span className="v1-title-name">oliver.nural@gmail.com</span></a>, 
                  Or alternatively, send me a message here, and i'll get back to you. 
                </div>
                <div className="v1-contact-form">
                  {displayForm}
                </div>
              </div>
    
            </div>
          </div>
        </Layout>
    );
  }
}

export default App;