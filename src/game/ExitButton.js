import React from "react";

export default function ExitButton(props) {
  const game = props.gameData;
  let text;
  if(props.secondPlayer === "observer" || game.state === "done") {
    text = "Back";
  }
  else
    text = "Surrender";
  return (
    <button
      className="exit-button"
      onClick={() => props.exitGame(game)}
    >
      {text}
    </button>
  )
}
