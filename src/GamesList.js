import React from 'react';
import responseGamesList from "./responseGamesList"

export default class GamesList extends React.Component{
  render(){
    return (
      <div className="all-list">
        {responseGamesList.map(
          (square, index) =>(
            <div
              key={index}
              className="all-square"
              state={square.state}
            >
              <div className="players">{square.owner}</div>
              <div className="players">{square.opponent}</div>
              <div className="time">{square.gameDuration}</div>
            </div>
          )
        )}
      </div>
    )
  }
}
