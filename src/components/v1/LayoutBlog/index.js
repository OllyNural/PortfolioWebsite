import React, { Component } from 'react'

export default class Layout extends Component {
    render() {
        let children = this.props.children
        return (
            <div>
                {children}
            </div>
        )
    }
}