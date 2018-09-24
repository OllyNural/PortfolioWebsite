import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { ItemTypes } from '../Const';
import { DragSource } from 'react-dnd';

import Button from '../Button'
import Input from '../Input'
// http://react-dnd.github.io/react-dnd/docs-tutorial.html

import './style.css'

const listItemSource = {
    beginDrag(props) {
        return {}
    }
}; 
  
function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

class ListItem extends Component {
    render() {
        const { connectDragSource, isDragging } = this.props
        let boundInputOnClick = this.props.setAsDone.bind(this, this.props.id)
        let boundButtonOnClick = this.props.delete.bind(this, this.props.id)
        return connectDragSource(
            <li className='list-item'>
                <span className='todo-item-title'>
                    {this.props.title}
                </span>
                <Input classNameProp='todo-item-input' isChecked={this.props.isDone} onclick={boundInputOnClick} />
                <Button isDone={this.props.isDone} onclick={boundButtonOnClick} />
            </li>
        )
    }
}

ListItem.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.CARD, listItemSource, collect)(ListItem)