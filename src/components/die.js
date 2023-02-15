import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };



  const diceDot = [];

  for (let i = 1; i <= props.value; i++) {
    if (props.value === 1) {
      diceDot.push(<span className="dice-dot"></span>);
    } else if (props.value === 2) {
      diceDot.push(<span className={`dice-dot dot-${2 - i}`}></span>);
    } else if (props.value === 3) {
      diceDot.push(<span className={`dice-dot dot-${3 - i}`}></span>);
    } else if (props.value === 4) {
      diceDot.push(<span className={`dice-dot dot-${4 - i}`}></span>);
    } else if (props.value === 5) {
      diceDot.push(<span className={`dice-dot dot-${5 - i}`}></span>);
    } else {
      diceDot.push(<span className={`dice-dot dot-${6 - i}`}></span>);
    }
  }
  return (
    <div
      className={`dice-face dice-${props.value}`}
      style={style}
      onClick={props.holdDice}
    >
      {diceDot}
    </div>
  );
}
