import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Particles from 'react-particles-js'

import config from 'config'

import Header from './Header'
import Footer from './Footer'

import './Layout.css';

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      kCode: ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"],
      pointer: 0,
      isKCode: false
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleKeyPress(event) {
    if (this.state.isKCode) return
    // If the input letter relates to the current correct konami code letter
    if (event.key === this.state.kCode[this.state.pointer]) {
      // If we are at the end of the konami code
      if (this.state.pointer === this.state.kCode.length - 1) {
        this.setState({isKCode: true})
      }
      this.setState({pointer: this.state.pointer + 1})
    } else {
      this.setState({pointer: this.state.pointer + 1})
    }
  }
  componentDidMount() {
    this.setState({ mounted: true })
  }
  render() {
    let child
    // if (this.state.mounted && !this.state.isKCode) {
      child = <div> {this.props.children} </div>
    // } else if (this.state.mounted && this.state.isKCode) {
    //   child = <div> <EasterEgg /> </div>
    // }
    return (
      <div className="v1-app-container" onKeyDown={this.handleKeyPress} tabIndex="0">
        <Particles params={config.ParticleConfig} className="v1-particle-container" />
          <Header />
          <ReactCSSTransitionGroup transitionName="v1-page" transitionEnterTimeout={1000} transitionLeaveTimeout={100000}>
            {child}
          </ReactCSSTransitionGroup>
          <Footer />
      </div>
      
    )
  }
}
