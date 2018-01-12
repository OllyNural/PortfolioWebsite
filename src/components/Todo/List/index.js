import React, { Component } from 'react'

import ListItem from '../ListItem'

import './style.css'

export default class List extends Component {
    render() {
        let listOfItems
        if (this.props.currentFilter === 'active') {
            listOfItems = this.props.data.filter(todo => todo.isDone === false)
        } else if (this.props.currentFilter === 'done') {
            listOfItems = this.props.data.filter(todo => todo.isDone === true)
        } else {
            listOfItems = this.props.data
        }
        listOfItems = listOfItems.map(todo => {
            return (<ListItem id={todo.id}
                            key={todo.id}
                            title={todo.title} 
                            isDone={todo.isDone} 
                            setAsDone={this.props.setAsDone} 
                            delete={this.props.delete}/>)
        })
        return (
            <ul className='todo-ul'>
                {listOfItems}
            </ul>
        )
    }
}