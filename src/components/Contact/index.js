import React, { Component } from 'react';

import Layout from '../Layout/Layout';
import Title from '../Layout/Title';
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
    console.log('Message send request received!');
    console.log('Name: ' + this.state.name);
    console.log('Email: ' + this.state.email);
    console.log('Message: ' + this.state.message);
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        message: document.getElementById('form-message').value
      })
    }).then((response) => {
      console.log(response);
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
      displayForm = <div className="form-submitted"><h3>Thank you for your message!</h3><p>If your email was valid, then the message will have been sent.</p></div>
    } else {
      displayForm = <ContactForm name={this.state.name} email={this.state.email} message={this.state.message} handleChange={this.handleFormChange} handleSubmit={this.handleSubmit} />
    }
    return (
        <Layout>
          <div className="page-container">
            <div className="contact-container">
              <Title title="Contact Me" />
              <div className="contact-intro-form">
                <div className="contact-text">
                  Feel free to send an email to <a href="mailto:oliver.nural@gmail.com"><span className="title-name">oliver.nural@gmail.com</span></a>, 
                  Or alternatively, send me a message here, and i'll get back to you. 
                </div>
                <div className="contact-form">
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