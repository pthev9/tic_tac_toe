import React from "react";

export default function Players(props) {
  const ownerWinner = props.winner === "owner";
  if (props.winner) {
    if (ownerWinner) {
      return (
        <div>
          <div className="player_first winner">
            {props.owner} &#10004;
          </div>
          <div className="player_second">
            {props.opponent}
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <div className="player_first">
            {props.owner}
          </div>
          <div className="player_second winner">
            {props.opponent} &#10004;
          </div>
        </div>
      )
    }
  }
  else {
    return (
      <div>
        <div className="player_first">
          {props.owner}
        </div>
        <div className="player_second">
          {props.opponent}
        </div>
      </div>
    )
  }
}
