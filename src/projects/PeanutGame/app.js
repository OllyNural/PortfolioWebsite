import React, { Component } from 'react'
import Game from './game'


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.onResize = this.onResize.bind(this)
    }

    componentWillMount() {
        window.addEventListener('resize', this.onResize)
    }

    onResize () {
        this.setState({
          width: window.innerWidth,
          height: window.innerHeight
        })
    }

    createStyle() {
        return {
            background: 'rgba(50,50,50,1)',
            position: 'fixed',
            top: 0,
            left: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: this.state.width,
            height: this.state.height
        }
    }

    render() {
        let style = this.createStyle()
        return (
            <div style={style}>
                <Game
                    bgMap={'assets/maps/desert.png'}
                    collisionMap={'assets/maps/desert-solid.gif'}
                    width={this.props.width}
                    height={this.props.height} />
            </div>
        )
    }
}