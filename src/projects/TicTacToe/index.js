import React, { Component } from 'react'
import Board from './Board/Board'

import './style.css';

export default class TicTacToePage extends Component {
  constructor() {
    super();
    this.choice = null;
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      playerIsX: null,
      xIsNext: true,
    };
  }
  handleClick(i) {
    if (this.checkIfPlayersTurn(this.state.playerIsX, this.state.xIsNext)) {
      this.takePlayerTurn(i);
    };
  }
  checkIfPlayersTurn(playerIsX, xIsNext) {
    if ((xIsNext && playerIsX) || (!xIsNext && !playerIsX)) {
      return true;
    }
    return false;
  }
  takePlayerTurn(i, callback) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    }, function() {
      if (this.getAllPossibleMoves(squares).length > 0) {
        this.computerTakesTurn();
      }
    });
    
  }
  computerTakesTurn() {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    
    if (calculateWinner(squares)) {
      return;
    }
    
    this.minimax(squares, 0);
    let numberToUse = this.choice;
    
    squares[numberToUse] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
  jumpTo(step) {
    if (this.state.playerIsX === null) {
      return;
    }
    let xIsNext = (step % 2) ? false : true;
    let playerIsNext = this.checkIfPlayersTurn(this.state.playerIsX, xIsNext) ? true : false;
    this.setState({
      stepNumber: step,
      xIsNext: xIsNext,
    }, function() {
      if (!playerIsNext) {
        this.computerTakesTurn();
      }
    });
  }
  setPlayer(choice) {
    let playerChoice = (choice === 'X') ? true : false;
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      playerIsX: playerChoice,
      xIsNext: true,
    }, function() {
      if (!playerChoice) {
        this.computerTakesTurn();
      }
    })
  }
  score(squares, depth) {
    let winner = calculateWinner(squares);
    let isCurrentPlayer;
    // When we check the score we need to know:
    //  Whose turn it is
    //  If the player is winning we want to do depth - 10
    //  If computer is winning we want 10 - depth
    if (this.state.playerIsX) {
      isCurrentPlayer = this.checkIfPlayersTurn(this.state.playerIsX, (depth % 2 === 1));
    } else {
      isCurrentPlayer = this.checkIfPlayersTurn(this.state.playerIsX, (depth % 2 === 0))
    }
    if (winner && !isCurrentPlayer) {
      return 10 - depth;
    } else if (winner && isCurrentPlayer) {
      return depth - 10;
    } else {
      return 0;
    }
  }
  minimax(squares, depth) {
    // If this recursive method call contains game-end, return the score
    if (calculateWinner(squares)) {
      return this.score(squares, depth);
    }
    depth += 1;
    let scores = [];
    let moves = [];
    let currentXIsNext;
    if (this.state.playerIsX) {
      currentXIsNext = (depth % 2 === 0);
    } else {
      currentXIsNext = (depth % 2 === 1);
    }
    let list = this.getAllPossibleMoves(squares);
    if (list.length === 0) {
      return 0;
    }
    for (let i = 0; i < list.length; i++) {
      let squaresCopy = squares.slice();
    //  Work out whose turn it is by using modulus of depth and get new board
      
      squaresCopy[list[i]] = currentXIsNext ? 'X' : 'O';
      scores.push(this.minimax(squaresCopy, depth));
    //  add to moves[]
      moves.push(list[i]);
    }
    
    
    // Min/Max Calc - check turn and choose biggest or lowest
    let choice_index;
    if (!this.checkIfPlayersTurn(this.state.playerIsX, currentXIsNext)) {
      choice_index = this.findIndexOfLowest(scores);
    } else {
      choice_index = this.findIndexOfGreatest(scores);
    }
    this.choice = moves[choice_index];
    return scores[choice_index];
    
  }
  getAllPossibleMoves(squares) {
    let list = [];
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        list.push(i);
      }
    }
    return list;
  }
  // Bit of code duplication here but is MUCH clearer than trying to abstract out.
  findIndexOfGreatest(array) {
    let greatest;
    let indexOfGreatest;
    for (let i = 0; i < array.length; i++) {
      if (greatest === null || greatest === undefined || array[i] > greatest) {
        greatest = array[i];
        indexOfGreatest = i;
      }
    }
    return indexOfGreatest;
  }
  findIndexOfLowest(array) {
    let lowest;
    let indexOfLowest;
    for (let i = 0; i < array.length; i++) {
      if (lowest === null || lowest === undefined || array[i] < lowest) {
        lowest = array[i];
        indexOfLowest = i;
      }
    }
    return indexOfLowest;
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ? 
          move : 
          0;
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })
    
    let status;
    if (winner) {
      status = 'Winner is ' + (!this.checkIfPlayersTurn(this.state.playerIsX, this.state.xIsNext) ? 'Player' : 'Computer');
    } else if (this.state.stepNumber === 9) {
      status = 'Draw!';
    } else {
      if (this.state.playerIsX === null) {
        status = 'Please choose playing order.';
      } else {
        status = 'Next player: ' + (this.checkIfPlayersTurn(this.state.playerIsX, this.state.xIsNext) ? 'Player' : 'Computer');
      }
    }
    
    return (
      <div className="tictactoe-container">
        <div className="game-title">
          <h1> TicTacToe </h1>
          <p>Try to beat me.</p>
        </div>
      
        <div className="game-container">
      
          <div className="time-machine">
            <p> Time Machine: </p>
            <ul>{moves}</ul>
          </div>
      
          <div className="board-container">
            <Board 
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              playerIsX={this.state.playerIsX}
            />
          </div>
      
        </div>
      
        <div className="game-turn">
          <div className="tictactoe-turn-container tictactoe-player">
            <i className="material-icons" onClick={() => this.setPlayer('X')}>face</i>
            <p>You start over.</p>
          </div>
          <span className="turn-display">{status}</span>
          <div className="tictactoe-turn-container tictactoe-computer">
            <i className="material-icons" onClick={() => this.setPlayer('O')}>computer</i>
            <p>Computer start over.</p>
          </div>
        </div>
        
      </div>
    );
  }
}

// ========================================

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}