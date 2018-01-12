import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Title from './Title'
import Body from './Body'

import './style.css'

class TodoPage extends Component {
    render() {
        return (
            <div className='todo-page-container'>
                <div className='todo-main-container'>
                    <Title title='Todos'/>
                    <Body />
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(TodoPage)