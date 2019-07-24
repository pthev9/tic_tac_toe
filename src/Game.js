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
      },
      timer: false
    };
    // if (this.props.match.params.secondplayer) {
    //   this.setState({
    //     game.state: "playing",
    //     game.opponent: this.props.match.params.secondplayer
    //   });
    // }
    this.storage = new LocalStorage();

    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
  }

  gameDataRefresh () {
    let gameToken = this.props.match.params.gameToken;
    let gameData = this.storage.getGameData(gameToken);
    if (this.props.match.params.secondplayer && !gameData.opponent) {
        gameData.state = "playing";
        gameData.opponent = this.props.match.params.secondplayer;
    }
    if(this.state.timer || this.state.game.gameDuration) {
      gameData.gameDuration = gameData.gameDuration + 1000;
    }
    this.setState({ game: gameData });
    let gamesData = JSON.parse(localStorage.getItem("games"));
    let gameIndex = gamesData.findIndex(
      game => game.gameToken === this.props.match.params.gameToken
    );
    gamesData[gameIndex] = gameData;
    gamesData = JSON.stringify(gamesData);
    localStorage.setItem("games", gamesData);
  }

  componentDidMount() {
    setInterval(this.gameDataRefresh, 5000)
  }

  selectSquare(row, col) {
    console.log(row, col);

    if(this.state.game.gameDuration === 0){
      this.setState({timer: true});
    }

    if(this.state.game.turn === "owner"){
      // this.setState({ game: gameField[row][col]})
      console.log("turn: owner")
    }
    if(this.state.game.turn === "opponent"){
     console.log("turn: opponent")
    }
    // let games = localStorage.getItem("games");
    // games = JSON.parse(games);
    // games = games.concat(newGame);
    // games = JSON.stringify(games);
    // localStorage.setItem("games", games);
  }

  timerSetup(time) {
    let sec =(time % 60000)/1000;
    let min = (time - 1000 * sec)/60000;
     return (min + " : " + sec);
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
        <div className="timer" >{this.timerSetup(this.state.game.gameDuration)}</div>
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
