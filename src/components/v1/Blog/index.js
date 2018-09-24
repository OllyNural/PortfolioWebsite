import React, { Component } from 'react';

import LayoutBlog from 'components/v1/LayoutBlog'

import './style.css';

class App extends Component {
  render() {
    return (
      <LayoutBlog>
        <div className='blog-page-container'>
          <div className='hero-image'>
            <img className='hero-image' src='something' alt='blog' />
          </div>
          <div className='blog'></div>
        </div>
      </LayoutBlog>
    );
  }
}

export default App;