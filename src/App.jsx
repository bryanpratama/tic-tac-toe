/* eslint-disable react/prop-types */
import { useState } from 'react'


function Square({value, onSquareClick}) {

  

  return (
    <button className='square' onClick={onSquareClick}>{value}</button>


  );

}

function Board({xIsNext, squares, onPlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquare = squares.slice();
    // if (xIsNext) {
    //   nextSquare[i] = 'X';
    // } else {
    //   nextSquare[i] = 'O';
    // }
    nextSquare[i] = xIsNext ? 'O' : 'X';
    // console.log(nextSquare);
    // nextSquare[i] = nextSquare[i] === null? 'X' : 'O';
    // setSquares(nextSquare);
    // setXIsNext(!xIsNext);
    onPlay(nextSquare);
  }
  const winner = calculateWinner(squares);
  // console.log(winner);
  let status = '';
  if (winner) {
    status = 'winner: ' + winner;

  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }
 
  return (
    <>
    <div className="status">{status}</div>
    <div className='board'>
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>  
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>  
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>  
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>  
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>  
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>  
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>  
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>  
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>  
    </div>
    </>
  )
}

export default function Game() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  // const currentSquares = history[history.length - 1];

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  function handlePlay(nextSquare) {
    const nexthistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nexthistory);
    setCurrentMove(nexthistory.length - 1);
    // setHistory([...history, nextSquare]);
    // setXIsNext(!xIsNext);
  }

 const moves = history.map((squares, move) => {
  let description = '';
  if (move > 0) {
    description = 'Go to move #' + move;
  } else {
    description = 'Go to game start';
  }
  return (
    <li key={move}>
      <button onClick={() => jumpTo(move)}>{description}</button>
    </li>
  )

 })

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>  
       </div>
       <div className="game-info">
       <ol>
       {moves}
        
       </ol>
      </div>


      </div>
    </>
  );
}


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
    // const a = lines[i][0];
    // const b = lines[i][1];
    // const c = lines[i][2];
    const [a, b, c] = lines[i];
    // if (squares[a] && squares[a] === squares[b] && squares[c]) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}