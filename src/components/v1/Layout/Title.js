import React, { Component } from 'react';

import'./Title.css';

export default class Title extends Component {
  render() {
    return (
      <div className="v1-title">
        <h1> {this.props.title} </h1>
        <hr />
      </div>
    );
  }
}