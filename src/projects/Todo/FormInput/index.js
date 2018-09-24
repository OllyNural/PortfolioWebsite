import React, { Component } from 'react'

import './style.css'

export default class FormInput extends Component {
    render() {
        return ( 
            <form className="todo-form" onSubmit={this.props.handleSubmit}>
                <input className='add-todo-input' value={this.props.value} onChange={e => this.props.handleChange(e)} type='text' />
                <input className="todo-submit" type="submit" value="submit" />
            </form>
        )
    }
}