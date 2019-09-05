import React from "react";

export default function Players(props) {
  if (props.result === "owner") {
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
  else if (props.result === "opponent") {
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
