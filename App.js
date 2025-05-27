import React, { useState } from "react";
import "./App.css";

const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayer1, setIsPlayer1] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winCombo, setWinCombo] = useState([]);

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const updatedBoard = [...board];
    updatedBoard[i] = isPlayer1 ? "✔" : "✖";
    setBoard(updatedBoard);
    setIsPlayer1(!isPlayer1);
    checkWinner(updatedBoard);
  };

  const checkWinner = (b) => {
    for (let combo of WIN_COMBOS) {
      const [a, b1, c] = combo;
      if (b[a] && b[a] === b[b1] && b[a] === b[c]) {
        setWinner(b[a] === "✔" ? "PLAYER 1" : "PLAYER 2");
        setWinCombo(combo);
        return;
      }
    }

    if (b.every((cell) => cell !== null)) {
      setWinner("TIE");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayer1(true);
    setWinner(null);
    setWinCombo([]);
  };

  const getStatus = () => {
    if (winner === "TIE") return "IT'S A TIE!";
    if (winner) return `${winner} WON!`;
    return isPlayer1 ? "TURN: ✔" : "TURN: ✖";
  };

  return (
    <div className="container">
      <h1>TIC-TAC-TOE</h1>
      <div className="status">{getStatus()}</div>
      <div className="board">
        {board.map((value, idx) => (
          <button
            key={idx}
            className={`cell ${winCombo.includes(idx) ? "highlight" : ""}`}
            onClick={() => handleClick(idx)}
          >
            {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        RESET
      </button>
    </div>
  );
}

export default App;
