import { useState, useEffect, useRef } from "react";
import Deice from "./Deice";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(() => generateNewDice());
  const refButton = useRef(null);

  function generateNewDice() {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
    }));
  }
  const gameOver = dice.every(
    (die) => die.value === dice[0].value && die.isHeld
  );

  useEffect(() => {
    if (gameOver && refButton.current) {
      refButton.current.focus();
    }
  });

  function rollDice() {
    if (gameOver) {
      setDice(generateNewDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 };
        })
      );
    }
  }

  function changeState(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  let diceElements = dice.map((die) => {
    return (
      <Deice
        number={die.value}
        isHeld={die.isHeld}
        changeState={() => changeState(die.id)}
      />
    );
  });

  return (
    <main>
      {gameOver && (
        <ReactConfetti
          width={window.innerWidth * 0.5}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
          style={{ margin: "0 auto" }}
        />
      )}
      <h1 className="title">Tezies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className="scr">You Won Click the button to start new game</p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice} ref={refButton}>
        {gameOver ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
