import React, { Component } from 'react'
import Player from './player.js'
import BackgroundMap from './assets/map/EarthBound-Winters-Map.png'
import BackgroundMapSolid from './assets/map/EarthBound-Winters-Map-Solid.png'
import FinalRoomMap from './assets/map/FinalRoom-Map-Christmas.png'
import FinalRoomMapSolid from './assets/map/FinalRoom-Map-Christmas-Solid.png'

import characters from './characters.js'

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
      inHouse: false,
      lastTime: Date.now(),
      isMovingNorth: false,
      isMovingEast: false,
      isMovingSouth: false,
      isMovingWest: false,
      speed: 0.1,
      x: 600,
      y: 100,
      distance: 0,
      hasMoved: false,
      characters: characters
    }
    this.moveLoop = this.moveLoop.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    this.solidCanvas = this.createSolidCanvas()
  }

  componentWillMount () {
    window.requestAnimationFrame(this.moveLoop)
  }

  createSolidCanvas() {
    let canvas = document.createElement('canvas')
    canvas.width = this.state.inHouse ? 128 : 999
    canvas.height = this.state.inHouse ? 255 : 1133
    let ctx = canvas.getContext('2d')
    let img = document.createElement('img')
    let backgroundMapSolid = this.state.inHouse ? FinalRoomMapSolid : BackgroundMapSolid
    img.src = backgroundMapSolid
    img.onload = () => { ctx.drawImage(img, 0, 0) }
    return canvas
  }

  convertCoords (xMap, yMap) {
    var x = xMap - this.state.x + this.props.width / 2
    var y = yMap - this.state.y + this.props.height / 2
    return [x, y]
  }

  checkSolid(x, y) {
    let ctx = this.solidCanvas.getContext('2d')
    let data = ctx.getImageData(x, y, 16, 1).data
    let collision = false
    for (let i = 0; i < data.length; i++) {
      if (data[i] > 0) collision = true
    }
    return collision
  }

  createStyle() {
    let backgroundMap = this.state.inHouse ? FinalRoomMap : BackgroundMap
    let backgroundPosition = this.state.inHouse ? 'center' : `${-this.state.x}px ${-this.state.y}px`
    let width = this.state.inHouse ? '255px' : this.props.width
    let height = this.state.inHouse ? '128px' : this.props.height
    return {
      width: width,
      height: height,
      position: 'relative',
      backgroundImage: `url(${backgroundMap})`,
      backgroundPosition: backgroundPosition,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      boxShadow: '0px 2px 10px 4px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transform: 'scale(2.11406)'
    }
  }

  calculateTheta () {
    let x = 0
    let y = 0

    if (this.state.isMovingNorth) y += 1
    if (this.state.isMovingSouth) y -= 1
    if (this.state.isMovingWest) x += 1
    if (this.state.isMovingEast) x -= 1

    return Math.atan2(y, x)
  }

  onKeyDown(e) {
    let code = e.keyCode
    let action = keyMap[code]
    if (!action) return

    if (action === 'up') this.setState({ isMovingNorth: true})
    if (action === 'right') this.setState({ isMovingEast: true})
    if (action === 'down') this.setState({ isMovingSouth: true})
    if (action === 'left') this.setState({ isMovingWest: true})
  }

  onKeyUp(e) {
    let code = e.keyCode
    let action = keyMap[code]
    if (!action) return

    if (action === 'up') this.setState({ isMovingNorth: false})
    if (action === 'right') this.setState({ isMovingEast: false})
    if (action === 'down') this.setState({ isMovingSouth: false})
    if (action === 'left') this.setState({ isMovingWest: false})
  }

  isMoving () {
    let isMoving = this.state.isMovingEast ||
      this.state.isMovingWest ||
      this.state.isMovingNorth ||
      this.state.isMovingSouth

    return isMoving
  }
  
  renderInstructions () {
    if (this.state.hasMoved) return ''

    var textBoxStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)',
      color: '#eaeaea',
      textAlign: 'center',
      fontSize: '0.5rem',
      fontFamily: '"Kalam", "comic sans ms", fantasy',
      letterSpacing: 1,
      fontWeight: 'bold',
      width: '100%',
      height: 30,
      position: 'absolute',
      left: 0,
      top: 0
    }

    return (
      <div style={textBoxStyle}>
        <span>Oh no! Peanut is lost! <br /> Help him get back to the rest of the bears.</span>
      </div>
    )
  }
  renderCongratulations () {
    if (!this.state.inHouse) return ''

    var textBoxStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.7)',
      color: '#eaeaea',
      textAlign: 'center',
      fontSize: '0.5rem',
      fontFamily: '"Kalam", "comic sans ms", fantasy',
      letterSpacing: 1,
      fontWeight: 'bold',
      width: '100%',
      height: 30,
      position: 'absolute',
      left: 0,
      top: 0
    }

    return (
      <div style={textBoxStyle}>
        <span>You won! <br /> Merry Christmas from all the bears. <br /> Oliver xxxx</span>
      </div>
    )
  }

  renderFinalRoom() {
    this.solidCanvas = this.createSolidCanvas()
  }

  moveLoop () {
    window.requestAnimationFrame(this.moveLoop)
    let lastTime = this.lastTime || Date.now() - 50
    this.lastTime = Date.now()

    if (!this.isMoving()) return this.setState({v: 0})

    let elapsed = Date.now() - lastTime
    let v = elapsed * this.state.speed

    let theta = this.calculateTheta()
    let x = this.state.x - (Math.cos(theta) * v)
    let y = this.state.y - (Math.sin(theta) * v)

    let px = x + this.props.width / 2
    let py = y + this.props.height / 2

    if (this.state.x > 122 && this.state.x < 133 
      && this.state.y > 847 && this.state.y < 857 && !this.state.inHouse) {
        setTimeout(() => {this.setState({inHouse: true, x: 45, y: 130}, () => {
          this.renderFinalRoom()
        })},3000); 
        return
      } else {
        let collision = this.checkSolid(px, py - 20)
    
        if (collision) return
    
        let distance = this.state.distance + v
        this.setState({x: x, y: y, distance: distance, hasMoved: true})
      }
  }

  render() {
    let theta = this.calculateTheta()
    if (!this.isMoving()) theta = this.state.lastTheta
    let step = Math.floor(this.state.distance/12) % 2

    let style = this.createStyle()
    let px = this.state.inHouse ? this.state.x : this.props.width/2
    let py = this.state.inHouse ? this.state.y : this.props.height/2

    // let characters = this.getCharacters()

    return (
      <div style={style}>
        <Player name={'peanut'}
          theta={theta}
          x={px}
          y={py}
          step={step} />

          { this.renderInstructions() }

          { this.renderCongratulations() }
      </div>
    )
  }
}

let keyMap = {
  38: 'up',
  39: 'right',
  40: 'down',
  37: 'left',
  87: 'up', // w
  68: 'right', // d
  83: 'down', // s
  65: 'left', // a
}


