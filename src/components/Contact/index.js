import React, { Component } from 'react';

import Layout from '../Layout/Layout';
import Title from '../Layout/Title';

import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      emailValid: false
    };
    
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleNameChange(event) {
    this.setState({name: event.target.value});
  }
  handleEmailChange(event) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({email: event.target.value});
    if (re.test(event.target.value)) {
      this.setState({emailValid: true});
    } else {
      this.setState({emailValid: false});
    }
  }
  handleMessageChange(event) {
    this.setState({message: event.target.value});
  }
  handleSubmit(event) {
    if (this.state.emailValid) {
      console.log('Message send request received!');
      console.log('Name: ' + this.state.name);
      console.log('Email: ' + this.state.email);
      console.log('Message: ' + this.state.message);
      
      {/*let url = "/api/contact";
      fetch(url, {method: 'POST'})
        .then(function(data) {
          console.log("Data:");
          console.log(data);
        })
        .catch(function(error) {
          console.log("Error!");
          console.log(error);
        }) */}
    } else {
      console.log('Invalid email: ' + this.state.email);
    }
    event.preventDefault();
  }
  sendEmail() {
    
  }
  render() {
    return (
        <Layout>
          <div className="page-container">
            <div className="contact-container">
      
              <Title title="Contact Me" />

              <div className="contact-intro-form">
                <div className="contact-text">
                  Feel free to send me an email to <a href="mailto:oliver.nural@gmail.com"><span className="title-name">oliver.nural@gmail.com</span></a>, 
                  Or alternatively, send me a message here, and i'll get back to you. 
                </div>
                <div className="contact-form">
                  <form onSubmit={this.handleSubmit}>
                      <input className="form-input" placeholder="Your name" type="text" value={this.state.name} onChange={this.handleNameChange} required />
                      <input className="form-input" placeholder="Your email" type="text" value={this.state.email} onChange={this.handleEmailChange} required />
                      <textarea className="form-input" placeholder="Message away!" type="text" value={this.state.message} onChange={this.handleMessageChange} required />
                      <input className="submit-button" type="submit" value="submit" />
                  </form>
                </div>
              </div>
    
            </div>
          </div>
        </Layout>
    );
  }
}

export default App;