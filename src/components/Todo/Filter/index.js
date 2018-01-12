import React, { Component } from 'react'
import Input from '../Input'

export default class Filter extends Component {
    render() {
        let boundFilterByActive = this.props.filterByStatus.bind(this, 'active')
        let boundFilterByDone = this.props.filterByStatus.bind(this, 'done')
        let boundFilterByAll = this.props.filterByStatus.bind(this, 'all')
        return (
            <div>
                <Input classNameProp='filter-input' isChecked={this.props.isFilterOn} onclick={boundFilterByAll}/>
                <Input classNameProp='filter-input' isChecked={this.props.isFilterOn} onclick={boundFilterByActive}/>
                <Input classNameProp='filter-input' isChecked={this.props.isFilterOn} onclick={boundFilterByDone}/> 
            </div>
        )
    }
}