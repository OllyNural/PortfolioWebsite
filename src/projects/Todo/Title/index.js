import React, { Component } from 'react'

import './style.css'

export default class Title extends Component {
    render() {
        return (
            <h1 className='todo-title'> {this.props.title} </h1>
        )
    }
}