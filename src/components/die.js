export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
  };
  return (
    <div className="dice-face" style={style} onClick={props.holdDice}>
      <h1 className="dice-num">{props.value}</h1>
    </div>
  );
}
