import React, { Component } from 'react'
import eDistance from 'euclidean-distance'
import Player from './player.js'
import BackgroundMap from './assets/map/EarthBound-Winters-Map.png'
import BackgroundMapSolid from './assets/map/EarthBound-Winters-Map-Solid.png'
import FinalRoomMap from './assets/map/FinalRoom-Map-Christmas.png'
import FinalRoomMapSolid from './assets/map/FinalRoom-Map-Christmas-Solid.png'

import characters from './characters.js'

import './game.css'


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
      speed: 0.08,
      x: 600,
      y: 100,
      distance: 0,
      hasMoved: false,
      characters: characters,
      isTransition: false,
      gameClasses: ['game'],
    }
    this.moveLoop = this.moveLoop.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    this.renderInteractionText = this.renderInteractionText.bind(this)
    this.getInteractionText = this.getInteractionText.bind(this)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    this.solidCanvas = this.createSolidCanvas()
  }

  componentWillMount() {
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
    let opacity = this.state.gameClasses.includes('hide') ? 0 : 1
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
      opacity: opacity,
      overflow: 'hidden',
      transform: 'scale(2.11406)',
      WebkitTransition: 'opacity 1s',
      MozTransition: 'opacity 1s',
      OTransition: 'opacity 1s',
      transition: 'opacity 1s'
    }
  }

  calculateTheta() {
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

    if (action === 'up') this.setState({ isMovingNorth: true })
    if (action === 'right') this.setState({ isMovingEast: true })
    if (action === 'down') this.setState({ isMovingSouth: true })
    if (action === 'left') this.setState({ isMovingWest: true })
  }

  onKeyUp(e) {
    let code = e.keyCode
    let action = keyMap[code]
    if (!action) return

    if (action === 'up') this.setState({ isMovingNorth: false })
    if (action === 'right') this.setState({ isMovingEast: false })
    if (action === 'down') this.setState({ isMovingSouth: false })
    if (action === 'left') this.setState({ isMovingWest: false })
  }

  isMoving() {
    let isMoving = this.state.isMovingEast ||
      this.state.isMovingWest ||
      this.state.isMovingNorth ||
      this.state.isMovingSouth

    return isMoving
  }

  renderInstructions() {
    if (this.state.hasMoved) return ''

    let textBoxStyle = {
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

  renderCongratulations() {
    if (!this.state.inHouse) return ''

    let textBoxStyle = {
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
      paddingBottom: '5px',
      height: 30,
      position: 'absolute',
      left: 0,
      top: 0
    }

    return (
      <div style={textBoxStyle}>
        <span>Congratulations! You returned Peanut safely! <br /> Merry Christmas from all the bears. <br /> Oliver xxxx</span>
      </div>
    )
  }

  renderFinalRoom() {
    this.solidCanvas = this.createSolidCanvas()
  }

  convertCoords(xMap, yMap) {
    let x = xMap - this.state.x + this.props.width / 2
    let y = yMap - this.state.y + this.props.height / 2
    return [x, y]
  }

  getCharacters() {
    let now = Date.now()
    let chars = this.state.characters.map(function (c) {
      let x, y, theta, step, loc

      if (typeof c.loc === 'function') {
        loc = c.loc(now)
        x = loc.x
        y = loc.y
        theta = loc.theta 
        step = loc.step
      } else {
        x = c.loc.x
        y = c.loc.y
        theta = c.theta || 0
        step = c.step || 0
      }

      return {
        name: c.name,
        loc: {
          x: x,
          y: y
        },
        theta: theta,
        step: step,
        inHouse: c.inHouse,
        response: c.response
      }
    })

    return chars
  }

  getInteractionText(characters) {
    let text = ''

    characters.forEach((c) => {
      if (c.inHouse !== this.state.inHouse) return ''
      let distance = eDistance([c.loc.x, c.loc.y], [this.state.x, this.state.y])
      if (distance < 25 && c.response) {
        text = c.response
      }
    })

    return text
  }

  renderInteractionText(characters) {
    let interactionText = this.getInteractionText(characters)
    if (!interactionText) return ''

    let textBoxStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)',
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
      bottom: 0
    }

    return (
      <div style={textBoxStyle}>
        <span>{interactionText}</span>
      </div>
    )
  }

  showRoomTransition() {
    setTimeout((() => {
      let tempGameClasses = this.state.gameClasses
      tempGameClasses.splice(tempGameClasses.length - 1, 1)
      this.setState({ gameClasses: tempGameClasses })
    }), 1000)
    if (this.state.isTransition) return
    this.setState({ gameClasses: [...this.state.gameClasses, 'hide'] })
  }

  moveLoop() {
    window.requestAnimationFrame(this.moveLoop)

    let lastTime = this.lastTime || Date.now() - 50
    this.lastTime = Date.now()

    if (!this.isMoving()) return this.setState({ v: 0 })

    let elapsed = Date.now() - lastTime
    let v = elapsed * this.state.speed

    let theta = this.calculateTheta()
    let x = this.state.x - (Math.cos(theta) * v)
    let y = this.state.y - (Math.sin(theta) * v)

    let px = x + this.props.width / 2
    let py = y + this.props.height / 2

    if (this.state.x > 122 && this.state.x < 133
      && this.state.y > 847 && this.state.y < 857) {
      this.showRoomTransition()
      this.setState({ isTransition: true })
      setTimeout(() => {
        this.setState({ inHouse: true, x: 45, y: 140 }, () => {
          this.renderFinalRoom()
        }
        )
      }, 1000);
      return
    } else {
      let collision = this.checkSolid(px, py - 20)

      if (collision) return

      let distance = this.state.distance + v
      this.setState({ x: x, y: y, distance: distance, hasMoved: true })
    }
  }

  render() {
    let theta = this.calculateTheta()
    if (!this.isMoving()) theta = this.state.lastTheta
    let step = Math.floor(this.state.distance / 12) % 2

    let style = this.createStyle()
    let px = this.state.inHouse ? this.state.x : this.props.width / 2
    let py = this.state.inHouse ? this.state.y : this.props.height / 2

    let characters = this.getCharacters()

    return (
      <div className={this.state.gameClasses.join(' ')} style={style}>

        {characters.map((c, i) => {
          let { x, y } = c.loc
          if (!c.inHouse) {
            let coords = this.convertCoords(x, y)
            x = coords[0]
            y = coords[1]
          }

          return (
            <Player
              name={c.name}
              isVisible={c.inHouse === this.state.inHouse}
              theta={c.theta}
              x={x}
              y={y}
              step={c.step} />
          )
        })}

        {this.renderInstructions()}

        <Player name={'peanut'}
          isVisible={'true'}
          theta={theta}
          x={px}
          y={py}
          step={step} />

        {this.renderCongratulations()}

        {this.renderInteractionText(characters)}
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


