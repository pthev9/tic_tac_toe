import React, {Component} from "react";
import LocalStorage from ".././services/LocalStorage";
import EndGame from "./EndGame";
import Square from "./Square";
import ExitButton from "./ExitButton";
import Timer from ".././common/Timer";
import {Redirect} from "react-router-dom";

import "./game.css";

export default class Game extends Component {
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
  }

  componentDidMount() {
    this.refreshGame = setInterval(() => this.gameDataRefresh(), 1000);
  }

  gameDataRefresh() {
    let games, gameIndex, game;
    let gameUpdated;
    let secondPlayerJoined;
    let gameToken = this.props.match.params.gameToken;
    let secondPlayer = this.props.match.params.secondPlayer;

    if (this.state.game.state === "done") {
      this.gameEndMessage();
      clearInterval(this.refreshGame);
      this.setState({redirect: true});
      return false;
    }

    [games, gameIndex, game] = this.storage.getActive(gameToken);
    gameUpdated = game;

    secondPlayerJoined = secondPlayer && !game.opponent;
    if (secondPlayerJoined) {
      gameUpdated.state = "playing";
      gameUpdated.opponent = secondPlayer;
    }

    this.setState({ game: gameUpdated, turnChanged: false });
    games[gameIndex] = gameUpdated;
    this.storage.update(games);
  }

  gameEndMessage() {
    let game = this.state.game;

    switch(game.result) {
      case "owner":
        alert(game.owner + " is Winner!");
        break;
      case "opponent":
        alert(game.opponent + " is Winner!");
        break;
      case "draw":
        alert("Draw!");
        break;
      default:
        console.log("this.state.game is " + (this.state.game));
    }
  }

  timer() {
    let gameToken = this.props.match.params.gameToken;
    let [games, gameIndex] = this.storage.getActive(gameToken);

    games[gameIndex].duration += 1000;
    this.storage.update(games);
    console.log(games[gameIndex].duration);
  }

  selectSquare(row, column) {
    let gameToken = this.props.match.params.gameToken;
    let secondPlayer = this.props.match.params.secondPlayer;
    let game = this.state.game;
    let playerCanMakeAMove = !game.field[row][column] &&
                             !this.state.turnChanged  &&
                             !game.result             &&
                              game.opponent;
    let gameStart = game.duration === 0   &&
                    game.turn === "owner" &&
                    !secondPlayer;

    if (secondPlayer === "observer") {
      return false;
    }

    if (gameStart) {
      let timeCounter = setInterval(this.timer, 1000);
      this.setState({timeCounter: timeCounter});
    }

    if (playerCanMakeAMove) {
      let [games, gameIndex, game] = this.storage.getActive(gameToken);
      let gameUpdated = game;
      this.playerMove(row, column, gameUpdated);
      this.checkEndGame(gameUpdated);
      games[gameIndex] = gameUpdated
      this.storage.update(games);
    }
  }

  playerMove(row, column, game) {
    let turn = this.state.game.turn;
    let secondPlayer = this.props.match.params.secondPlayer;
    let firstPlayerMove = !secondPlayer && turn === "owner";
    let secondPlayerMove = secondPlayer && turn === "opponent";

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
  }

  checkEndGame(game) {
    let winner = this.endGame.getWinner(game.field);
    let noWays = this.endGame.checkNoWays(game.field);

    if (winner === 1) {
      game.result = "owner";
    }
    else if (winner === 2) {
      game.result = "opponent";
    }
    else if (noWays) {
      game.result = "draw";
    }

    if (winner || noWays) {
      game.state = "done";
      clearInterval(this.state.timeCounter);
    }
  }

  exitGame(game) {
    let gameToken = this.props.match.params.gameToken;
    let secondPlayer = this.props.match.params.secondPlayer;
    let gameUpdated = game;

    if (secondPlayer === "observer") {
      clearInterval(this.refreshGame);
      this.setState({redirect: true});
      return false;
    }

    if (gameUpdated.turn === "opponent") {
      gameUpdated.result = "owner";
    }
    else {
      gameUpdated.result = "opponent";
    }
    gameUpdated.state = "done";

    let [games, gameIndex] = this.storage.getActive(gameToken)
    games[gameIndex] = gameUpdated;

    if (!gameUpdated.opponent) {
      games.splice(gameIndex, 1);
      clearInterval(this.refreshGame);
      this.setState({redirect: true});
    }

    this.storage.update(games);
    clearInterval(this.state.timeCounter);
  }

  render() {
    let game = this.state.game;
    let field = this.state.game.field;
    let ownerTurn = game.turn === "owner";

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <span className={`player-first ${ownerTurn ? "move" : ""}`}>
          {game.owner} X
        </span>
        <span className={`player-second ${!ownerTurn ? "move" : ""}`}>
          {game.opponent} O
        </span>

        <div className="field-block">
          <div className="game-field">
            {field.map((row, index) =>(
              <Square key         ={index}
                      row         ={row}
                      rowIndex    ={index}
                      selectSquare={this.selectSquare.bind(this)}
              />
            ))}
          </div>
        </div>

        <Timer className="timer-game"
               duration={game.duration}
        />
        <ExitButton secondPlayer={this.props.match.params.secondPlayer}
                    gameData={game}
                    exitGame={this.exitGame.bind(this)}
        />
      </div>
    )
  }
}
