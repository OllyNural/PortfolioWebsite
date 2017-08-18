import React, { Component } from 'react';
import Board from './Board/Board';

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
      difficulty: 'hard',
    };
  }
  handleClick(i) {
    if (this.state.playerIsX === null) {
      console.log("Please select the playing order.");
    } else if (this.checkIfPlayersTurn(this.state.playerIsX, this.state.xIsNext)) {
      // If players turn to play!
      this.takePlayerTurn(i);
    } else {
      // Computers turn, do nothing
    };
  }
  checkIfPlayersTurn(playerIsX, xIsNext) {
    if ((xIsNext && playerIsX) || (!xIsNext && !playerIsX)) {
      return true;
    }
    return false;
  }
  takePlayerTurn(i) {
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
      this.computerTakesTurn();
    });
  }
  computerTakesTurn() {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    let current = history[history.length - 1];
    let squares = current.squares.slice();
    
    if (calculateWinner(squares)) {
      return;
    }
    
    let numberToUse;
    
    if (this.state.difficulty === 'hard') {
      console.log("Hard computer playing now");
      this.minimax(squares, 0);
      numberToUse = this.choice;
    } else {
      console.log("Easier computer playing now");
      // Old randomised selection
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      let list = [];
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
          list.push(i);
        }
      }
      // Get random number
      let randomNum = getRandomNumber(list.length);
      numberToUse = list[randomNum];
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
    
    
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
      console.log("Please select the playing order.");
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
  setDifficulty(choice) {
    this.setState({
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
      difficulty: choice,
    })
  }
  score(squares, depth) {
    let winner = calculateWinner(squares);
    let isCurrentPlayer = this.checkIfPlayersTurn(this.state.playerIsX, (this.state.xIsNext || (depth % 2 === 1)))
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
    let currentXIsNext = (this.state.xIsNext || (depth % 2 === 0));
    
    // Populate scores array w/ recursion
    // Get all possible moves from this current location
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
  // Bit of code duplication here but is MUCH clearer than trying to abstract out. Sorry!
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
          'Move #' + move : 
          'Game start';
      return (
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      )
    })
    
    let status;
    if (winner) {
      status = 'Winner is ' + (!this.checkIfPlayersTurn(this.state.playerIsXx, this.state.xIsNext) ? 'Player' : 'Computer');
    } else {
      console.log(this.state.stepNumber);
      if (this.state.stepNumber === 0) {
        status = 'Please choose playing order.';
      } else {
        status = 'Next player: ' + (this.checkIfPlayersTurn(this.state.playerIsX, this.state.xIsNext) ? 'Player' : 'Computer');
      }
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        <div className="player-info">
          <text>
            Choose who starts:<br/>
            <span className="" onClick={() => this.setPlayer('X')}> You start over </span><br/>
            or <br/>
            <span onClick={() => this.setPlayer('O')}> Computer starts over</span>.
          </text>
        </div>
        <div className="difficulty">
          <text>
            Choose your difficulty: <br/>
              <span className="" onClick={() => this.setDifficulty('easy')}> Easy </span><br/>
              or <br/>
              <span className="" onClick={() => this.setDifficulty('hard')}> Hard </span><br/>
          </text>
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

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}