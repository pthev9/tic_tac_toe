import React from 'react';
import {Redirect} from "react-router-dom";
import LocalStorage from "./LocalStorage";

export default class GamesList extends React.Component {
  constructor() {
    super()
    this.state = {
      games: [],
      redirect: false
    }
    this.storage = new LocalStorage();
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
    this.createNewGame = this.createNewGame.bind(this);
    // this._isMounted = false;

  }
  createNewGame() {
    if(this.state.username) {
      let gameToken = this.state.username.replace(/\s+/g, '') + Date.now();
      console.log(gameToken);
      let newGame = {
        gameToken:    gameToken,
        owner:        this.state.username,
        opponent:     "",
        size:         3,
        gameDuration: 0,
        gameResult:   "" ,
        state:        "ready",
        turn:         "owner",
        gameField: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      }
      this.setState({gameToken: gameToken, redirect: true})
      this.storage.pushData(newGame);
    }
    else alert("Enter name");
  }

  gameDataRefresh() {
    let gamesData = this.storage.getData()
    this.setState({games: gamesData});
  }

  // componentWillUnmout(){
  // this._isMounted = false;
  // }

  componentDidMount() {
    // this._isMounted = true;
    setInterval(this.gameDataRefresh, 5000);
  }

  userNameChange(event) {
    this.setState({username: event.target.value});
  }

  render(){
    if (this.state.redirect) {
      let path = "/game/" + this.state.gameToken;
      return (<Redirect to={path}/>)
    }

    else {
      let games = this.state.games;
      return (
        <div>
          <input
            className="input-name"
            type="text"
            placeholder="Enter name"
            onChange={this.userNameChange}
          />
          <button
            className="button"
            onClick={this.createNewGame}
          >
            Create new game
          </button>
          <div className="all-list">
            {games.map(
              (square, index) =>(
                <div
                  key={index}
                  className={`all-square ${square.state}`}
                  onClick={()=>{
                    this.setState({gameToken: square.gameToken, redirect: true});
                  }}
                >
                  <div className="player">{square.owner}</div>
                  <div className="player">{square.opponent}</div>
                  <div className="timer">{square.gameDuration}</div>
                </div>
              )
            )}
          </div>
        </div>
      )
    }
  }
}
