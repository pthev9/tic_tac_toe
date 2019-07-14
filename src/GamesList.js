import React from 'react';
import responseGamesList from "./responseGamesList";
import {Redirect} from "react-router-dom";

export default class GamesList extends React.Component {
  constructor() {
    super()
    this.state = {
      goto: false
    }
  }

  render(){
    let games = responseGamesList;
    games = JSON.stringify(games);
    console.log(games);
    localStorage.setItem("games", games);
    games = localStorage.getItem("games");
    console.log(games);
    games = JSON.parse(games);
    console.log(games);

    if (this.state.goto) {
      let path = "/game/" + this.state.gameToken;
      return (<Redirect to={path}/>)
    }

    return (
      <div>
        <input
          className="input-name"
          type="text"
          placeholder="Enter name"
        />
        <button
          className="button"
          onClick={this.createNewGame}>
          Create new game
        </button>
        <div className="all-list">
          {responseGamesList.map(
            (square, index) =>(
              <div
                key={index}
                className="all-square"
                state={square.state}
                gametoken={square.gameToken}
                onClick={()=>{
                  this.setState({gameToken: square.gameToken, goto: true});
                }}
              >
                <div className="player">{square.owner}</div>
                <div className="player">{square.opponent}</div>
                <div className="time">{square.gameDuration}</div>
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}
