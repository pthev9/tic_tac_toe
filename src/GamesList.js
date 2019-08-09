import React from 'react';
import {Redirect} from "react-router-dom";
import Games from "./LocalStorage/Games";

export default class GamesList extends React.Component {
  constructor() {
    super()
    this.state = {
      games: [],
      redirect: false
    }
    this.storage = new Games();
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
    this.createNewGame = this.createNewGame.bind(this);
    this._isMounted = false;
  }

  createNewGame() {
    if(this.state.username) {
      let gameToken = this.state.username.replace(/\s+/g, '') + Date.now();
      console.log("gameToken: " + gameToken);
      let newGame = {
        gameToken:    gameToken,
        owner:        this.state.username,
        opponent:     "",
        size:         3,
        gameDuration: 0,
        gameResult:   "",
        state:        "ready",
        turn:         "owner",
        gameField: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      }
      this.setState({gameToken: gameToken, redirect: true});
      let games = this.storage.getAll();
      this.storage.pushNew(games, newGame);
    }
    else alert("Enter name");
  }

  gameDataRefresh() {
    let games = this.storage.getAll();
    this.setState({games: games});
  }

  componentWillUnmout(){
  this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    setInterval(this.gameDataRefresh, 2000);
  }

  userNameChange(event) {
    this.setState({username: event.target.value});
  }

  joiningObserver(game){
    this.setState({
      gameToken: game.gameToken + "/observer",
      redirect: true
    });
  }

  joiningPlayer(game) {
    if(this.state.username) {
      this.setState({
        gameToken: game.gameToken + "/" + this.state.username ,
        redirect: true
      });
    }
    else alert("Enter name");
  }

  selectGame(game){
    switch(game.state) {
      case "ready":
        this.joiningPlayer(game);
        break;
      case "playing":
        this.joiningObserver(game);
        break;
      case "done":
        alert("this game is over");
        break;
      default:
        console.log("game.state undefined");
    }
  }

  render(){
    if (this.state.redirect) {
      let path = "/game/" + this.state.gameToken;
      return (<Redirect to={path}/>)
    }

    else {
      let games = this.state.games;
      if (!games) return (
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
          <h1> No games </h1>
        </div>
      )
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
              (game, index) =>(
                <div
                  key={index}
                  className={`all-square ${game.state}`}
                  onClick={() => this.selectGame(game)}
                >
                  <div className="player">{game.owner}</div>
                  <div className="player">{game.opponent}</div>
                  <div className="timer">{game.gameDuration}</div>
                </div>
              )
            )}
          </div>
        </div>
      )
    }
  }
}
