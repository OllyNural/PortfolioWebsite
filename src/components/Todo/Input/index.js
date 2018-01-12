import React, { Component } from 'react'

import './style.css'

export default class Input extends Component {
    render() {
        return (
            <input className={this.props.classNameProp} type='checkbox' checked={this.props.isChecked} onChange={() => this.props.onclick()} />
        )
    }
}