import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

import Layout from '../Layout/Layout';
import Title from '../Layout/Title';

import './style.css';

class CustomRect extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Rect
        width={this.props.width/10}
        height={this.props.height/10}
        fill='green'
      />
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { width: '0', height: '0' }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }
  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }
  render() {
    return (
      // Don't need <Layout> Tag as we are just rendering this element withn the Layout tag, not as a child of it
        <div className="easter-game-container">
          <Stage width={this.state.width} height={this.state.height}>
            <Layer>
              <CustomRect width={this.state.width} height={this.state.height}/>
            </Layer>
          </Stage>
        </div>
    );
  }
}
export default App;


  /**
   * 
   * Pokemon battle intro -
   *  How much screen do we want to be covered - for this I feel like we need to do the whole screen
   * 
   * Fast paced - screen turns black and text appears - 'Game Time' 'I hope you're ready' 'Good luck' 'It's on!'
   * Something like this
   * 
   * Game idea - the O and the N from ON are the two characters - controlled by arrows keys
   * 
   * hold o + arrow keys to move o
   * hold k + arrow keys to move k
   * 
   * Avoid obstables or solve puzzles working together sort of thing
   * 
   * Other game references 
   * 
   * Escape X is at the top of the screen
   * 
   * 
   * 
   * 
   * OR
   * 
   * Screen stays the same, Same Header/background colour etc
   * Simple character game, perhaps stickman/character/sprite moving around world
   * 
   *
   * 
   * OR 
   * Destroy webpage sort of thing
   * Elements can be destroyed or created or whatever
   * Not sure what elements but yeah idea stays the same
   * 
   * 
   */