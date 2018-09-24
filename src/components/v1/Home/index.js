import React, { Component } from 'react';

import Layout from 'components/v1/Layout/Layout'

import './style.css';
import './font-awesome/css/font-awesome.min.css';

class App extends Component {
  render() {
    return (
        <Layout>
          <div className="v1-single-page-container">
            <div className="v1-home-container">
              <div className="v1-home-title">
                Hello. <br className="v1-home-title-break" />My name is <span className="v1-title-name">Oliver Nural</span>.
              </div>
        
              <div className="v1-home-introduction">
                <p>I am a Full Stack Javascript developer based in London.</p>
          
                <p>Please have a look around, or visit my social media pages below.</p>
              </div>  
      
              <div className="v1-social-bar">      
                  <div className="v1-github-link v1-social-link">
                      <a href="https://github.com/OllyNural" target="github">
                          <span className="fa fa-github"></span>
                      </a>
                  </div>
                  <div className="v1-linkedin-link v1-social-link">
                      <a href="https://www.linkedin.com/in/oliver-nural-43565497" target="linkedin">
                        <span className="fa fa-linkedin"></span>
                      </a>
                  </div>
                  <div className= "v1-twitter-link v1-social-link">
                      <a href="https://twitter.com/OliverNural" target="twitter">
                          <span className="fa fa-twitter"></span>
                      </a>
                  </div>
                  <div className="v1-facebook-link v1-social-link">
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