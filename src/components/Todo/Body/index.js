import React, { Component } from 'react'
import FormInput from '../FormInput'
import Filter from '../Filter'
import TodoList from '../List'

import './style.css'

export default class TodoBody extends Component {
    constructor() {
        super()
        this.state = {
            newTodo: JSON.parse(localStorage.getItem('newTodo')) || '',
            lastId: JSON.parse(localStorage.getItem('lastId')) || 0,
            listOfTodos: JSON.parse(localStorage.getItem('listOfTodos')) || [],
            currentFilter: JSON.parse(localStorage.getItem('currentFilter')) || 'all'
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setAsDone = this.setAsDone.bind(this)
        this.delete = this.delete.bind(this)
        this.filterByStatus = this.filterByStatus.bind(this)
    }
    saveToLocalStorage(arr) {
        if (arr.includes('newTodo')) localStorage.setItem('newTodo', JSON.stringify(this.state.newTodo))
        if (arr.includes('listOfTodos')) localStorage.setItem('listOfTodos', JSON.stringify(this.state.listOfTodos))
        if (arr.includes('lastId')) localStorage.setItem('lastId', JSON.stringify(this.state.lastId))
        if (arr.includes('currentFilter')) localStorage.setItem('currentFilter', JSON.stringify(this.state.currentFilter))
    }
    handleInputChange(e) {
        this.setState({newTodo: e.target.value}, () => {
            this.saveToLocalStorage(['newTodo'])
        });
    }
    setAsDone(id) {
        let todoIndex = this.state.listOfTodos.findIndex(todo => todo.id === id)
        let newArray = this.state.listOfTodos.slice()
        newArray[todoIndex].isDone = !newArray[todoIndex].isDone
        this.setState({listOfTodos: newArray}, () => {
            this.saveToLocalStorage(['listOfTodos'])
        })
    }
    delete(id) {
        let updatedTodos = this.state.listOfTodos.filter(todo => todo.id !== id)
        this.setState({listOfTodos: updatedTodos}, () => {
            this.saveToLocalStorage(['listOfTodos'])
        })
    }
    filterByStatus(status) {
        this.setState({currentFilter: status}, () => {
            this.saveToLocalStorage(['currentFilter'])
        })
    }
    checkInput() {
        if (!this.state.newTodo) return false
        if (this.state.listOfTodos.find(todo => todo.title === this.state.newTodo)) return false 
        return true
    }
    handleSubmit(e) {
        e.preventDefault()
        if (this.checkInput()) {
            this.setState({
                listOfTodos: [{id: this.state.lastId + 1, title: this.state.newTodo, isDone: false}, ...this.state.listOfTodos],
                newTodo: '', lastId: this.state.lastId + 1
            }, () => {
                this.saveToLocalStorage(['newTodo', 'lastId', 'listOfTodos'])
            })
        }
    }
    render() {
        return (
            <div className='todo-body-container'> 
                <FormInput value={this.state.newTodo} handleChange={this.handleInputChange} handleSubmit={this.handleSubmit} />
                <Filter currentFilter={this.state.currentFilter} filterByStatus={this.filterByStatus} />
                <TodoList currentFilter={this.state.currentFilter} data={this.state.listOfTodos} setAsDone={this.setAsDone} delete={this.delete} />
            </div>
        )
    }
}