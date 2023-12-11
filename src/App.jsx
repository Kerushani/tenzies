import { useState, useEffect } from "react";
import Header from "./components/Header";
import Dice from "./components/Dice";
import Button from "./components/Button";
import { nanoid } from "nanoid";
import "./App.css";
import Confetti from "react-confetti";

function App() {
  const [diceArray, setDiceArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  //called when dice is container is clicked; will toggle isHeld property to change dice color
  function holdDice(id) {
    setDiceArray((oldDice) => {
      return oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : { ...dice };
      });
    });
  }

  //randomizes dice values
  function allNewDice() {
    let newDiceArray = [];
    for (let i = 0; i < 10; i++) {
      let newDice = {
        value: Math.floor(Math.random() * 6),
        isHeld: false, //used to toggle between default and clicked dice states
        id: nanoid(),
      };
      newDiceArray.push(newDice);
    }
    return newDiceArray;
  }

  //Maps the Dice component using diceArray
  let diceElements = diceArray.map((prev) => (
    <Dice
      diceValue={prev.value}
      id={prev.id}
      isHeld={prev.isHeld}
      holdDice={() => holdDice(prev.id)}
    />
  ));

  //called when user clicks "Roll Again" button; calls allNewDice function
  function rollDice() {
    if (!tenzies) {
      setDiceArray((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld === true
            ? { ...die }
            : { ...die, value: Math.floor(Math.random() * 6), id: nanoid() };
        });
      });
    }
    if (tenzies) {
      setTenzies(false);
      setDiceArray(allNewDice());
    }
  }

  useEffect(() => {
    let valuesEqual = false;
    for (let i = 0; i < diceArray.length; i++) {
      if (diceArray[i].value !== diceArray[0].value) {
        valuesEqual = false;
        break;
      } else {
        valuesEqual = true;
      }
    }

    let isHeldTrue = false;
    for (let i = 0; i < diceArray.length; i++) {
      if (diceArray[i].isHeld !== diceArray[0].isHeld) {
        isHeldTrue = false;
        break;
      } else {
        isHeldTrue = true;
      }
    }

    if (valuesEqual && isHeldTrue) {
      setTenzies(true);
      // console.log('Youve won')
    } else {
      console.log("need to try more");
    }
  }, [diceArray]);

  return (
    <div className="content">
      <Header />
      <div className="dice-container">{diceElements}</div>
      <Button whenClicked={() => rollDice()} tenzies={tenzies} />
      {tenzies && <Confetti />}
    </div>
  );
}

export default App;
