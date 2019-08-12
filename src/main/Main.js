import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Games from ".././LocalStorage/Games";
// import List from "./List";
import "./main.css";

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      games: [],
      redirect: false
    }
    this.storage = new Games();
    this.createNewGame = this.createNewGame.bind(this);
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
        turn:         "owner",
        field: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ]
      };
      this.setState({gameToken: gameToken, redirect: true});
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
  // Doesn't work
  // componentWillUnmout() {
  //   clearInterval(this.refreshList);
  //   console.log("component unloaded");
  // }

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

  render() {
    let games = this.state.games;
    let list;

    if (this.state.redirect) {
      clearInterval(this.refreshList);
      let path = "/game/" + this.state.gameToken;
      return (<Redirect to={path}/>)
    }

    if (!games) {
      list = <h1> No games </h1>;
    }
    else {
      list =
            // <List
            //     gamesList={this.state.games}
            //     selectGame={this.selectGame}
            //  />
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
                     <div className="timer">{game.duration}</div>
                   </div>
                 )
               )}
             </div>

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
            onClick={this.createNewGame}
          >
            Create new game
          </button>

          {list}
        </div>
      </div>
    )
  }
}
