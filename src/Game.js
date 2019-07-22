import React, {Component} from "react";
import LocalStorage from "./LocalStorage";

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
      }
    };
    this.storage = new LocalStorage();
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
  }

  gameDataRefresh () {
    let gameToken = this.props.match.params.gameToken;
    let gameData = this.storage.getGameData(gameToken);
    this.setState({game: gameData});
  }

  componentDidMount() {
    setInterval(this.gameDataRefresh, 5000)
  }

  selectSquare(rowIndex, columnIndex) {
    console.log(rowIndex, columnIndex);
    // let games = localStorage.getItem("games");
    // games = JSON.parse(games);
    // games = games.concat(newGame);
    // games = JSON.stringify(games);
    // localStorage.setItem("games", games);
  }

  render(){
    let gameData = this.state.game;
    let gameField = this.state.game.gameField;
    return (
      <div>
        <div>
          <div className="player-first"  >{gameData.owner}</div>
          <div className="player-second" >{gameData.opponent}</div>
        </div>
        <div className="game-field">
          {gameField.map((row, index) =>(
            <Square
              key        ={index}
              row        ={row}
              rowIndex   ={index}
              selectSquare={this.selectSquare}
            />
          ))}
        </div>
        <div className="timer">{gameData.gameDuration}</div>
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
