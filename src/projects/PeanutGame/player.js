import React, { Component } from 'react'
import characters from './characterDefs'

let scales = {
  'peanut': '0.5'
}

export default class Player extends Component {
  constructor(props) {
    super(props)
    this.state = {
        character: characters[this.props.name]
    }
  }

  getOrientation(theta) {
    let PI = Math.PI
    let orientation
    if (theta === (0 * PI/4)) orientation = 'west'
    if (theta === (1 * PI/4)) orientation = 'northWest'
    if (theta === 2 * PI/4) orientation = 'north'
    if (theta === 3 * PI/4) orientation = 'northEast'
    if (theta === 4 * PI/4) orientation = 'east'

    if (theta === -1 * PI/4) orientation = 'southWest'
    if (theta === -2 * PI/4) orientation = 'south'
    if (theta === -3 * PI/4) orientation = 'southEast'
    return orientation || 'south'
  }

  render() {
    let theta = this.props.theta

    let character = this.state.character
    let sprite = require(`.${character['sprite']}`)

    let orientation = this.getOrientation(theta)
    // let spriteLoc   = character.orientations[orientation][this.props.step]


    let spriteLocs = character.orientations[orientation] || {}
    let spriteLoc = spriteLocs[this.props.step] || [0, 0]

    let x = spriteLoc[0] * character.width
    let y = spriteLoc[1] * character.height

    let flip = spriteLoc[2] ? -1 : 1

    let style = {
      borderRadius: '10px',
      width: this.state.character.width,
      height: this.state.character.height,
      position: 'absolute',
      left: this.props.x - character.width/2,
      top: this.props.y - character.height,
      background: `url(${sprite})`,
      backgroundPosition: `${-x}px ${-y}px`,
      transform: `scale(${scales[character.name]}) scaleX(${flip})`
    }

    return (
      <div style={style} />
    )
  }
}
