import React, { Component } from 'react'

import './style.css'

export default class Button extends Component {
    render() {
        return (
            <button className='todo-item-button' onClick={() => this.props.onclick(this.props.id)}>X</button>
        )
    }
}