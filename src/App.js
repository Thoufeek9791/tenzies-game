import logo from "./logo.svg";
import Die from "./components/die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const isAllHeld = dice.every(die => die.isHeld)
    const firtValue = dice[0].value
    const isAllSameVaue = dice.every(die => die.value === firtValue)

    if(isAllSameVaue && isAllHeld) {
      setTenzies(true)
    }
  })

  function generateNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
   if(!tenzies) {
    setDice((prevDice) =>
    prevDice.map((die) => (die.isHeld ? die : generateNewDice()))
  );
   }
   else {
    setDice(allNewDice())
    setTenzies(false)
   }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElement = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  return (
    <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>

      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
