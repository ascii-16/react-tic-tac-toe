import React, { useState } from 'react';
import './App.scss';
import Box from './components/Box'

function App() {
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [values, setValues] = useState(Array(9).fill(null));
  const nextPlayer = isPlayer1 ? 'X' : 'O';
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(false);

  const handleClick = i => {
    // Returns if box already contain an element
    if(values[i] !== null || winner) {
      return;
    }

    const getValues = [...values];
    getValues[i] = isPlayer1 ? 'X' : 'O';

    setValues(getValues); // Setting values array
    setIsPlayer1(!isPlayer1); // Setting next player
    getWinner(getValues);
    checkDraw(getValues);
  }
  

  const getWinner = (boxValues) => {
    const currentPlayer = isPlayer1 ? 'X' : 'O';
    const rowIndexes = [0, 3, 6];
    const columnIndexes = [0, 1, 2];
    const diagonalIndexes = [0, 2];
    const commonIndex = 2;
    let flag = false;

    for(let i = 0; i < boxValues.length; i++) {
      if(boxValues[i] === currentPlayer) {
        // Check if elements are repeated 
        // diagonal, horizontal, or vertical 
        ( 
          boxValues[i+1] === currentPlayer &&
          boxValues[i+2] === currentPlayer &&
          rowIndexes.includes(i)
        ) ||
        (
          boxValues[i+3] === currentPlayer &&
          boxValues[i+6] === currentPlayer &&
          columnIndexes.includes(i)
        ) ||
        (
          boxValues[i+2] === currentPlayer &&
          boxValues[i+4] === currentPlayer &&
          (i+2 !== commonIndex) &&
          diagonalIndexes.includes(i)
        ) ||
        (
          boxValues[i+4] === currentPlayer &&
          boxValues[i+8] === currentPlayer&&
          diagonalIndexes.includes(i)
        ) ? 
          flag = true: 
          flag = false;
      }

      // Breaks from loop if match found
      if(flag) {
        break;
      }
    }

    if(flag) {
      setWinner(currentPlayer);
    }
  }

  const checkDraw = (boxValues) => {
    // Sets draw if all the boxes are filled
    let flag = false;

    for ( const value of boxValues ) {
      if ( value === null ) {
        flag = true;
        break;
      }
    }

    if(!flag) {
      setDraw(true);
    }
  }

  // Resets all values
  const reset = () => {
    setValues(Array(9).fill(null));
    setIsPlayer1(true);
    setWinner(null);
    setDraw(false);
  }

  return (
    <div className="App">
      <h1 className="Page-title">tic tac toe using reactjs</h1>
      <div className="Status">
        { 
          winner ? 
          `Winner: ${winner}` : 
          draw ? `Draw` : `${nextPlayer}'s turn `
        }
      </div>
      <div className="Box-container">
        <div className="Box-row">
          { values.map((value, index) =>
            <div 
              className="Box-col" 
              key={index}>
              <Box 
                value={value} 
                onClick={() => handleClick(index)} />
            </div>
          )}
        </div>
      </div>
      <button 
        className="Reset-button"
        onClick={reset}>
        { winner ? "Play Again" : "Reset"}
      </button> 
    </div>
  );
}

export default App;
