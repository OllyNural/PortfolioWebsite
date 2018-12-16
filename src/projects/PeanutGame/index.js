import React, { Component } from 'react'
import App from './app'

// const width = 400;
// const height = 300;
const width = 320;
const height = 240;

export default class PeanutGamePage extends Component {
  render() {
    return (
      <App 
        width={width}
        height={height}/>
    )
  }
}