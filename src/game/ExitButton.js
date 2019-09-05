import React from "react";

export default function ExitButton(props) {
  let game = props.gameData;
  let text;
  if(!game.opponent || props.secondPlayer === "observer") {
    text = "Back";
  }
  else
    text = "Surrender";

  return (
    <button className="exit-button"
            onClick={() => props.exitGame(game)}
    >
      {text}
    </button>
  )
}
