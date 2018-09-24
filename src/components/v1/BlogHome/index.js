import React, { Component } from 'react';

import LayoutBlog from 'components/v1/LayoutBlog'

import './style.css';

class App extends Component {
  render() {
    return (
      <LayoutBlog>
        <div className='blog-page-container'>
          <div className='blog-header'>
          
          </div>
          <div className='side-panel'>
            <span>Oliver Nural</span>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Work</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className='blog'></div>
        </div>
      </LayoutBlog>
    );
  }
}

export default App;