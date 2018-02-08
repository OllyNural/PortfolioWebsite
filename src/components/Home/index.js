import React, { Component } from 'react';

import Layout from '../Layout/Layout'

import './style.css';
import  './font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
        <Layout>
          <div className="single-page-container">
            <div className="home-container">
              <div className="home-title">
                Hello. <br className="home-title-break" />My name is <span className="title-name">Oliver Nural</span>.
              </div>
        
              <div className="home-introduction">
                <p>I am a Java and Full Stack Javascript developer based in London.</p>
          
                <p>Please have a look around, or visit my social media pages below.</p>
              </div>  
      
              <div className="social-bar">      
                  <div className="github-link social-link">
                      <a href="https://github.com/OllyNural" target="github">
                          <span className="fa fa-github"></span>
                      </a>
                  </div>
                  <div className="linkedin-link social-link">
                      <a href="https://www.linkedin.com/in/oliver-nural-43565497" target="linkedin">
                        <span className="fa fa-linkedin"></span>
                      </a>
                  </div>
                  <div className= "twitter-link social-link">
                      <a href="https://twitter.com/OliverNural" target="twitter">
                          <span className="fa fa-twitter"></span>
                      </a>
                  </div>
                  <div className="facebook-link social-link">
                      <a href="https://www.facebook.com/Olly.Nural" target="facebook">
                          <span className="fa fa-facebook"></span>
                      </a>
                  </div>
                </div>
              </div>
          </div>
        </Layout>
    );
  }
}

export default App;