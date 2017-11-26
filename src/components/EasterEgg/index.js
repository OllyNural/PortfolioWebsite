import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

import Layout from '../Layout/Layout';
import Title from '../Layout/Title';

import './style.css';

class CustomRect extends Component {
  render() {
    return (
      <Rect
        x={10}
        y={10}
        width={100}
        height={100}
        fill='green'
      />
    )
  }
}

class App extends Component {
  render() {
    return (
        <Layout>
          <div className="easter-game-container">
            <Stage width={500} height={500}>
              <Layer>
                <CustomRect />
              </Layer>
            </Stage>
            {/* <canvas height="500px" width="500px"></canvas> */}
          </div>
        </Layout>
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