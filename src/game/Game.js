import React, {Component} from "react";
import LocalStorage from ".././services/LocalStorage";
import EndGame from "./EndGame";
import Square from "./Square";
import Timer from "./Timer";
import {Redirect} from "react-router-dom";

import "./game.css";

export default class Game extends Component {
  gameToken;
  constructor(props) {
    super(props)
    this.state = {
      game: {
        field: [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
        owner: "",
        opponent: ""
      },
      timeCounter: "",
      redirect: false,
      turnChanged: false
    };
    this.storage = new LocalStorage();
    this.endGame = new EndGame();
    this.timer = this.timer.bind(this);
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    const secondPlayer = this.props.match.params.secondplayer;
  }

  gameDataRefresh() {
    if (this.state.game.state === "done") {
      clearInterval(this.state.timeCounter);
      return false;
    }
    let games, game, gameToken, gameIndex;
    gameToken = this.props.match.params.gameToken;
    games = this.storage.getAll();
    gameIndex = this.storage.getActiveIndex(games, gameToken);
    game = games[gameIndex];

    if (this.props.match.params.secondplayer === "observer"){
      console.log("you watching");
    }

    if (this.props.match.params.secondplayer && !game.opponent) {
      game.state = "playing";
      game.opponent = this.props.match.params.secondplayer;
    }

    this.setState({ game: game, turnChanged: false });

    games[gameIndex] = game
    this.storage.update(games);
  }

  componentDidMount() {
    this.refreshGame = setInterval(() => this.gameDataRefresh(), 1000);
  }

  timer() {
    let games, game, gameIndex;
    let gameToken = this.props.match.params.gameToken;
    games = this.storage.getAll();
    gameIndex = this.storage.getActiveIndex(games, gameToken);
    game = games[gameIndex];

    game.duration += 1000;
    console.log(game.duration);

    games[gameIndex] = game
    this.storage.update(games);
  }

  selectSquare(row, column) {
    let turn = this.state.game.turn;
    // let secondPlayer = this.props.match.params.secondplayer;
    if (!this.state.game.field[row][column] &&
        !this.state.turnChanged &&
        !this.state.game.result &&
        this.state.game.opponent) {

      if (this.state.game.duration === 0 &&
          this.state.game.turn === "owner") {
            let timeCounter = setInterval(this.timer, 1000);
            this.setState({timeCounter: timeCounter});
      }

      if (this.props.match.params.secondplayer === "observer"){
        return false;
      }
      let games, game, gameIndex;
      let gameToken = this.props.match.params.gameToken;
      games = this.storage.getAll();
      gameIndex = this.storage.getActiveIndex(games, gameToken);
      game = games[gameIndex];

      let firstPlayerMove = !this.secondPlayer && turn === "owner";
      let secondPlayerMove = this.secondPlayer && turn === "opponent";
        if (firstPlayerMove) {
          this.setState({turnChanged: true});
          game.field[row][column] = 1;
          game.turn = "opponent";
        }
        if (secondPlayerMove) {
          this.setState({turnChanged: true});
          game.field[row][column] = 2;
          game.turn = "owner";
        }
      let winner = this.endGame.getWinner(game.field);
        if (winner === 1) {
          game.result = "owner";
          alert(game.owner + " is Winner!")
        }
        if (winner === 2) {
          game.result = "opponent";
          alert(game.opponent + " is Winner!")
        }
      let noWays = this.endGame.checkNoWays(game.field);
      if (noWays) {game.result = "draw"; alert("Draw!")};
      if (winner || noWays) {
        game.state = "done";
      }
      games[gameIndex] = game
      this.storage.update(games);
    }
  }

  timerSetup(time) {
    let sec =(time % 60000)/1000;
    let min = (time - 1000 * sec)/60000;
     return ("0" + min + " : " + sec);
  }

  exitGame(game) {
    if (this.props.match.params.secondplayer === "observer") {
      clearInterval(this.refreshGame);
      this.setState({redirect: true});
      return false;
    }
    if (game.turn === "opponent") {
      game.result = "opponent";
    }
    else {
      game.result = "owner";
    }
    game.state = "done";
    let games = this.storage.getAll();
    let gameIndex = this.storage.getActiveIndex(games, game.gameToken);
    games[gameIndex] = game;
    this.storage.update(games);
    clearInterval(this.refreshGame);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      console.log("component unload");
      return <Redirect to="/"/>
    }

    let game = this.state.game;
    let field = this.state.game.field;

    return (
      <div>
        <span className="player-first"  > {game.owner} </span>
        <span className="player-second" > {game.opponent} </span>
        <div className="field-block">
          <div className="game-field">
            {field.map((row, index) =>(
              <Square
                key         ={index}
                row         ={row}
                rowIndex    ={index}
                selectSquare={this.selectSquare}
              />
            ))}
          </div>
        </div>
        <Timer duration={game.duration} />
        <button
          className="exit-button"
          onClick={() => this.exitGame(game)}
        >
          Surrender
        </button>
      </div>
    )
  }
}
