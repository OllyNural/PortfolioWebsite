import React from 'react';

import './Board.css';

function Square(props) {
  // playerIsX X 
  let buttonClass = props.playerIsX && (props.value === 'X') ? 'green' : 'red';
  if (props.playerIsX) {
    if (props.value === 'X') {
      buttonClass = 'green';
    } else {
      buttonClass = 'red';
    }
  } else {
    if (props.value === 'X') {
      buttonClass = 'red';
    } else {
      buttonClass = 'green';
    }
  }
  return (
    <button className="square" onClick={props.onClick}>
      <span className={'tictactoe-button ' + (buttonClass)}>{props.value}</span>
    </button>
  );
}

export default class Board extends React.Component {  
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
        playerIsX={this.props.playerIsX}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}