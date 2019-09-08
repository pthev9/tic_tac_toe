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
  }

  componentDidMount() {
    this.refreshGame = setInterval(() => this.gameDataRefresh(), 1000);
  }

  gameDataRefresh() {
    let games, gameIndex, game;
    let gameUpdated;
    let gameToken = this.props.match.params.gameToken;
    let secondPlayer = this.props.match.params.secondPlayer;

    if (this.state.game.state === STATE_DONE) {
      this.gameEndMessage();
      clearInterval(this.refreshGame);
      this.setState({redirect: true});
      return false;
    }

    [games, gameIndex, game] = this.storage.getActive(gameToken);
    gameUpdated = game;

    let secondPlayerJoined = secondPlayer && !game.opponent;
    if (secondPlayerJoined) {
      gameUpdated.state = STATE_PLAYING;
      gameUpdated.opponent = secondPlayer;
    }

    this.setState({ game: gameUpdated, turnChanged: false });
    games[gameIndex] = gameUpdated;
    this.storage.update(games);
  }

  gameEndMessage() {
    let game = this.state.game;

    switch(game.result) {
      case RESULT_WINNER_OWNER:
        alert(game.owner + " is Winner!");
        break;
      case RESULT_WINNER_OPPONENT:
        alert(game.opponent + " is Winner!");
        break;
      case RESULT_DRAW:
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
  }

  selectSquare(row, column) {
    let gameToken = this.props.match.params.gameToken;
    let secondPlayer = this.props.match.params.secondPlayer;
    let game = this.state.game;
    let playerCanMakeAMove = !game.field[row][column] &&
                               !this.state.turnChanged  &&
                                game.opponent;
    let gameStart = game.duration === 0      &&
                      game.state === STATE_PLAYING &&
                      !secondPlayer;

    if (secondPlayer === OBSERVER) {
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
    let firstPlayerMove = !secondPlayer && turn === MOVE_OWNER;
    let secondPlayerMove = secondPlayer && turn === MOVE_OPPONENT;

    if (firstPlayerMove) {
      this.setState({turnChanged: true});
      game.field[row][column] = MOVE_OWNER;
      game.turn = MOVE_OPPONENT;
    }
    if (secondPlayerMove) {
      this.setState({turnChanged: true});
      game.field[row][column] = MOVE_OPPONENT;
      game.turn = MOVE_OWNER;
    }
  }

  checkEndGame(game) {
    let winnerMarker = this.endGame.getWinner(game.field);
    let noWays = this.endGame.checkNoWays(game.field);

    if (winnerMarker === MOVE_OWNER) {
      game.result = RESULT_WINNER_OWNER;
    }
    else if (winnerMarker === MOVE_OPPONENT) {
      game.result = RESULT_WINNER_OPPONENT;
    }
    else if (noWays) {
      game.result = RESULT_DRAW;
    }

    if (winnerMarker || noWays) {
      game.state = STATE_DONE;
      clearInterval(this.state.timeCounter);
    }
  }

  exitGame(game) {
    let gameToken = this.props.match.params.gameToken;
    let secondPlayer = this.props.match.params.secondPlayer;
    let gameUpdated = game;

    if (secondPlayer === OBSERVER) {
      clearInterval(this.refreshGame);
      this.setState({redirect: true});
      return false;
    }

    if (secondPlayer) {
      gameUpdated.result = RESULT_WINNER_OWNER;
    }
    else {
      gameUpdated.result = RESULT_WINNER_OPPONENT;
    }
    gameUpdated.state = STATE_DONE;

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
    let ownerMove = game.turn === MOVE_OWNER;

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <span className={`player-first ${ownerMove ? "move" : ""} `}>
          {game.owner} X
        </span>
        <span className={`player-second ${!ownerMove ? "move" : ""} `}>
          {game.opponent} O
        </span>

        <div className="field-block">
          <div className="game-field">
            {field.map((row, index) =>(
              <Square
                key         ={index}
                row         ={row}
                rowIndex    ={index}
                selectSquare={this.selectSquare.bind(this)}
              />
            ))}
          </div>
        </div>

        <Timer
          className="timer-game"
          duration={game.duration}
        />
        <ExitButton
          secondPlayer={this.props.match.params.secondPlayer}
          gameData={game}
          exitGame={this.exitGame.bind(this)}
        />
      </div>
    )
  }
}

const RESULT_WINNER_OWNER    = "owner";
const RESULT_WINNER_OPPONENT = "opponent";
const RESULT_DRAW            = "draw";
const STATE_PLAYING = "playing";
const STATE_DONE    = "done";
const MOVE_OWNER    = 1;
const MOVE_OPPONENT = 2;
const OBSERVER = "observer";
