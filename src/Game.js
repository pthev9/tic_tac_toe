import React, {Component} from "react";
import Games from "./LocalStorage/Games";
import CheckEndGame from "./CheckEndGame";
import {Redirect} from "react-router-dom";

export default class Game extends Component {
  gameToken;
  constructor(props) {
    super(props)
    this.state = {
      game: {
        gameField: [
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
    this.storage = new Games();
    this.endGame = new CheckEndGame();
    this.timer = this.timer.bind(this);
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    // this._isMounted = false;
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
    // this._isMounted = true;
    setInterval(this.gameDataRefresh, 1000);
  }

  // componentWillUnmout(){
  // this._isMounted = false;
  // }

  timer() {
    let games, game, gameIndex;
    let gameToken = this.props.match.params.gameToken;
    games = this.storage.getAll();
    gameIndex = this.storage.getActiveIndex(games, gameToken);
    game = games[gameIndex];

    game.gameDuration += 1000;
    console.log(game.gameDuration);

    games[gameIndex] = game
    this.storage.update(games);
  }

  selectSquare(row, column) {
    let turn = this.state.game.turn;
    let secondPlayer = this.props.match.params.secondplayer;
    if (!this.state.game.gameField[row][column] &&
        !this.state.turnChanged &&
        !this.state.game.gameResult &&
        this.state.game.opponent) {

      if (this.state.game.gameDuration === 0 &&
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

      let firstPlayerMove = !secondPlayer && turn === "owner";
      let secondPlayerMove = secondPlayer && turn === "opponent";
        if (firstPlayerMove) {
          this.setState({turnChanged: true});
          game.gameField[row][column] = 1;
          game.turn = "opponent";
        }
        if (secondPlayerMove) {
          this.setState({turnChanged: true});
          game.gameField[row][column] = 2;
          game.turn = "owner";
        }
      let winner = this.endGame.checkEndGame(game.gameField);
        if (winner === 1) {
          game.gameResult = "owner";
          alert(game.owner + " is Winner!")
        }
        if (winner === 2) {
          game.gameResult = "opponent";
          alert(game.opponent + " is Winner!")
        }
      let noWays = this.endGame.checkNoWays(game.gameField);
      if (noWays) {game.gameResult = "draw"; alert("Draw!")};
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
      this.setState({redirect: true});
      return false;
    }
    if (game.turn === "opponent") {
      game.gameResult = "opponent";
    }
    else {
      game.gameResult = "owner";
    }
    game.state = "done";
    let games = this.storage.getAll();
    let gameIndex = this.storage.getActiveIndex(games, game.gameToken);
    games[gameIndex] = game;
    this.storage.update(games);
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/gameslist"/>
    }
    let game = this.state.game;
    let gameField = this.state.game.gameField;
    return (
      <div>
        <span className="player-first"  >{game.owner}</span>
        <span className="player-second" >{game.opponent}</span>
        <div className="field-block">
          <div className="game-field">
            {gameField.map((row, index) =>(
              <Square
                key         ={index}
                row         ={row}
                rowIndex    ={index}
                selectSquare={this.selectSquare}
              />
            ))}
          </div>
        </div>
        <div className="timer" >{this.timerSetup(game.gameDuration)}</div>
        <button className="exit-button"
                onClick={() => this.exitGame(game)}
        > Surrender </button>
      </div>
    )
  }
}

class Square extends Component {

  getSquareFilling(square) {
    if (square === 1) {
      return "game-square cross"}
    if (square === 2) {
      return "game-square null"}
    else return "game-square";
  }

  render() {
    return (
      (this.props.row).map((square, index) =>
        <div
          key={index}
          className={this.getSquareFilling(square)}
          onClick={() => this.props.selectSquare(this.props.rowIndex, index)}
        >
        </div>
      )
    )
  }
}
