import Die from "./components/die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [trackDice, setTrackDice] = useState(0);
  // const [trackTime, setTrackTime] = useState(false)
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);

  // console.log(dice);

  if (hrs > 23) {
    setHrs(0);
  }
  if (mins > 59) {
    setMins(0);
    setHrs((prevHrs) => prevHrs + 1);
  }
  if (sec > 59) {
    setSec(0);
    setMins((preMins) => preMins + 1);
  }

  useEffect(() => {
    const isAllHeld = dice.every((die) => die.isHeld);
    const firtValue = dice[0].value;
    const isAllSameVaue = dice.every((die) => die.value === firtValue);

    if (isAllSameVaue && isAllHeld) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    let timer = setInterval(() => {
      if (!isGameStarted) {
        return;
      }

      if (tenzies) {
        return;
      }
      setSec((prevSec) => prevSec + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [tenzies, isGameStarted]);

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
    if (!tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHeld ? die : generateNewDice()))
      );

      if (!isGameStarted) {
        setIsGameStarted((preGame) => !preGame);
      } else {
        setTrackDice((prevCount) => prevCount + 1);
      }
    } else {
      setDice(allNewDice());
      setTenzies(false);
      setIsGameStarted(false);
      setTrackDice(0);
      setHrs(0);
      setMins(0);
      setSec(0);
    }
  }

  function holdDice(id) {
    if (isGameStarted && !tenzies) {
      setDice((prevDice) =>
        prevDice.map((die) => {
          return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
        })
      );
    }
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
    <div className="app">
      {tenzies && <Confetti />}
      <div className="timer-container">
        <h1>
          Time:
          <span className="timer">
            &nbsp;
            {String(hrs).padStart(2, "0")} : {String(mins).padStart(2, "0")} :
             &nbsp;{String(sec).padStart(2, "0")}
          </span>
        </h1>
      </div>
      <div className="count-container">
        <h1>
          Count: <span className="counter">{trackDice}</span>
        </h1>
      </div>
      <main>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElement}</div>

        <button className="roll-dice" onClick={rollDice}>
          {tenzies ? "New Game" : isGameStarted ? "Roll" : "Start Game"}
        </button>
      </main>
    </div>
  );
}

export default App;
