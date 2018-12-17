import React, { Component } from 'react'
import Player from './player.js'
import BackgroundMap from './assets/map/EarthBound-Winters-Map.png'
import BackgroundMapSolid from './assets/map/EarthBound-Winters-Map-Solid.png'

export default class Game extends Component {
  constructor() {
    super();
    this.state = {
        lastTime: Date.now(),
        isMovingNorth: false,
        isMovingEast: false,
        isMovingSouth: false,
        isMovingWest: false,
        speed: 0.1,
        x: 600,
        y: 100,
        distance: 0
    }
    this.moveLoop = this.moveLoop.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    this.solidCanvas = this.createSolidCanvas()
    console.log(this.solidCanvas)
  }

  componentWillMount () {
    window.requestAnimationFrame(this.moveLoop)
  }

  createSolidCanvas() {
    let canvas = document.createElement('canvas')
    canvas.width = 999
    canvas.height = 1133
    let ctx = canvas.getContext('2d')
    let img = document.createElement('img')
    img.src = BackgroundMapSolid
    console.log(img.src)
    img.onload = () => { ctx.drawImage(img, 0, 0) }
    return canvas
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
    return {
      // border: '1px solid red',
      width: this.props.width,
      height: this.props.height,
      position: 'relative',
      backgroundImage: `url(${BackgroundMap})`,
      backgroundPosition: `${-this.state.x}px ${-this.state.y}px`,
      backgroundRepeat: 'no-repeat',
      imageRendering: 'pixelated',
      boxShadow: '0px 2px 10px 4px rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      // transform: 'scale(1.5)'
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

    var px = x + this.props.width / 2
    var py = y + this.props.height / 2

    let collision = this.checkSolid(px, py)
    console.log(collision)

    if (collision) return

    let distance = this.state.distance + v
    this.setState({x: x, y: y, distance: distance})
  }

  render() {
    let theta = this.calculateTheta()
    if (!this.isMoving()) theta = this.state.lastTheta
    let step = Math.floor(this.state.distance/12) % 2

    let style = this.createStyle()
    let px = this.props.width/2
    let py = this.props.height/2

    return (
      <div style={style}>
        <Player name={'peanut'}
          theta={theta}
          x={px}
          y={py}
          step={step} />
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


