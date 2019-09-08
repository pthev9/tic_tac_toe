import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import LocalStorage from ".././services/LocalStorage";
import List from "./List";
import "./main.css";

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
      redirect: false,
      path: ""
    }
    this.storage = new LocalStorage();
  }

  createNewGame() {
    if(this.state.username) {
      let date = new Date();
      date = date.getDate()    + "" +
             date.getMinutes() + "" +
             date.getSeconds();
      let gameToken = this.state.username.replace(/\s+/g, "") + date;
      let newGame = {
        gameToken:    gameToken,
        owner:        this.state.username,
        opponent:     "",
        size:         3,
        duration:     0,
        result:       "",
        state:        "ready",
        turn:         1,
        field: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      };
      this.setState({path: gameToken, redirect: true});
      let games = this.storage.getAll();
      this.storage.pushNew(games, newGame);
    }
    else alert("Enter name");
  }

  refreshListOfGames() {
    let games = this.storage.getAll();
    this.setState({ games: games });
  }

  componentDidMount() {
    this.refreshList = setInterval(() => this.refreshListOfGames(), 2000);
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
        console.log("game.state is " + (game.state));
    }
  }

  joiningObserver(game){
    this.setState({
      path: game.gameToken + "/observer",
      redirect: true
    });
  }

  joiningPlayer(game) {
    if(this.state.username) {
      this.setState({
        path: game.gameToken + "/" + this.state.username ,
        redirect: true
      });
    }
    else alert("Enter name");
  }

  render() {
    let games = this.state.games;

    if (this.state.redirect) {
      clearInterval(this.refreshList);
      let path = "/game/" + this.state.path;
      return (<Redirect to={path}/>)
    }

    return (
      <div>
        <div className="input_block">
          <input
            className="input_name"
            type="text"
            placeholder="Enter name"
            onChange={(event) => this.setState({username: event.target.value})}
          />

          <button
            className="input_button"
            onClick={this.createNewGame.bind(this)}
          >
            Create new game
          </button>

          {games && (
            <List
              gamesList={this.state.games}
              selectGame={this.selectGame.bind(this)}
            />
          )}

          {!games && (
            <h1> No games </h1>
          )}
        </div>
      </div>
    )
  }
}
