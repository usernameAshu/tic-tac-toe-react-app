import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }
  return currPlayer;
}

function deriveGameBoard(gameTurns) {
  //We should copy this array immutabiliy
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCombination =
      gameBoard[combination[0].row][combination[0].column];
    const secondCombination =
      gameBoard[combination[1].row][combination[1].column];
    const thirdCombination =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstCombination &&
      firstCombination === secondCombination &&
      secondCombination === thirdCombination
    ) {
      winner = players[firstCombination];
    }
  }

  return winner;
}

function App() {
  // const [activePlayer, setActivePlayer] = useState("X");
  // const [hasWinner, setHasWinner] = useState(false)
  //We can know the winner from game turns
  const [gameTurns, setGameTurns] = useState([]);

  const [players, setPlayers] = useState(PLAYERS);

  let activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);

  const isDraw = gameTurns.length === 9 && !winner;

  function handleChangePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurn) => {
      const currPlayer = deriveActivePlayer(prevTurn);

      let currTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prevTurn,
      ];
      return currTurn;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  }

  const winner = deriveWinner(gameBoard, players);
  console.log(`Winner: ${winner}`);

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerNameChange}
          />
          <Player
            initName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleChangePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
