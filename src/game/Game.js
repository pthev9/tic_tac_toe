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
    let game = this.state.game;
    let secondPlayer = this.props.match.params.secondplayer;
    let gameToken = this.props.match.params.gameToken;
<<<<<<< HEAD
    let playerCanMakeAMove = !game.field[row][column] &&
                             !this.state.turnChanged  &&
                             !game.result             &&
=======
    let playerCanMakeAMove = !game.field[row][column]     &&
                             !this.state.turnChanged &&
                             !game.result                 &&
>>>>>>> ecedd7e4e918ed2d82d61737f20f78756507c489
                              game.opponent;
    let gameStart = game.duration === 0 && game.turn === "owner";

    if (secondPlayer === "observer"){
      return false;
    }

    if (playerCanMakeAMove) {
      if (gameStart) {
            let timeCounter = setInterval(this.timer, 1000);
            this.setState({timeCounter: timeCounter});
      }

      let [games, gameIndex, game] = this.storage.getActive(gameToken);
      let gameUpdated = game;
<<<<<<< HEAD
      this.playerMove(row, column, gameUpdated);
      this.checkEndGame(gameUpdated);
=======

      this.playerMove(row, column, gameUpdated);

      this.checkEndGame(gameUpdated);

>>>>>>> ecedd7e4e918ed2d82d61737f20f78756507c489
      games[gameIndex] = gameUpdated
      this.storage.update(games);
    }
  }

  playerMove(row, column, game) {
    let secondPlayer = this.props.match.params.secondplayer;
    let turn = this.state.game.turn;
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
<<<<<<< HEAD
    let noWays = this.endGame.checkNoWays(game.field);

=======
>>>>>>> ecedd7e4e918ed2d82d61737f20f78756507c489
      if (winner === 1) {
        game.result = "owner";
        alert(game.owner + " is Winner!")
      }
      if (winner === 2) {
        game.result = "opponent";
        alert(game.opponent + " is Winner!")
      }

<<<<<<< HEAD
    if (noWays) {game.result = "draw"; alert("Draw!")};
=======
    let noWays = this.endGame.checkNoWays(game.field);
    if (noWays) {game.result = "draw"; alert("Draw!")};

>>>>>>> ecedd7e4e918ed2d82d61737f20f78756507c489
    if (winner || noWays) {
      game.state = "done";
    }
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
    clearInterval(this.state.timeCounter);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      console.log("component unload");
      return <Redirect to="/"/>
    }

    let game = this.state.game;
    let field = this.state.game.field;
    let ownerTurn = game.turn === "owner";
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
              <Square
                key         ={index}
                row         ={row}
                rowIndex    ={index}
                selectSquare={this.selectSquare}
              />
            ))}
          </div>
        </div>

        <Timer
          className="timer-game"
          duration={game.duration}
        />

        <ExitButton
          secondPlayer={this.props.match.params.secondplayer}
          gameData={game}
          exitGame={this.exitGame.bind(this)}
        />
      </div>
    )
  }
}
