import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import LocalStorage from ".././services/LocalStorage";
import List from "./List";
import DataInput from "./DataInput";
import "./main.css";

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
      username: "",
      size: 3,
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

      let field = new Array(parseInt(this.state.size));
        for (let i = 0; i < field.length; i++)
          field[i] = Array(parseInt(this.state.size)).fill(0);
      let newGame = {
        gameToken: gameToken,
        owner:     this.state.username,
        opponent:  "",
        size:      parseInt(this.state.size),
        duration:  0,
        result:    "",
        state:     "ready",
        turn:      1,
        field:     field
      };
      console.log(field);
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

  playerNameChange(event) {
    this.setState({username: event.target.value});
  }

  fieldSizeChange(event) {
    this.setState({size: event.target.value});
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
        {games && (
          <List
            gamesList={this.state.games}
            selectGame={this.selectGame.bind(this)}
          />
        )}

        {!games && (
          <h1> No games </h1>
        )}

        <DataInput
          playerNameChange={this.playerNameChange.bind(this)}
          fieldSizeChange ={this.fieldSizeChange.bind(this)}
          createNewGame   ={this.createNewGame.bind(this)}
        />
      </div>
    )
  }
}
