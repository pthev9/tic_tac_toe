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
      timer: false,
      redirect: false
    };
    this.storage = new LocalStorage();

    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.selectSquare = this.selectSquare.bind(this);
    // this._isMounted = false;
  }

  gameDataRefresh () {
    let gameToken = this.props.match.params.gameToken;
    let gameData = this.storage.getGameData(gameToken);

    if (this.props.match.params.secondplayer === "observer"){
      console.log("you watching");
    }
    if (this.props.match.params.secondplayer && !gameData.opponent) {
        gameData.state = "playing";
        gameData.opponent = this.props.match.params.secondplayer;
    }
    if(this.state.timer || this.state.game.gameDuration) {
      gameData.gameDuration = gameData.gameDuration + 1000;
    }
    this.setState({ game: gameData, turnChanged: false });
    let gamesData = JSON.parse(localStorage.getItem("games"));
    let gameIndex = gamesData.findIndex(
      game => game.gameToken === gameToken
    );
    gamesData[gameIndex] = gameData;
    gamesData = JSON.stringify(gamesData);
    localStorage.setItem("games", gamesData);
  }

  componentDidMount() {
    // this._isMounted = true;
    setInterval(this.gameDataRefresh, 5000)
  }

  // componentWillUnmout(){
  // this._isMounted = false;
  // }

  selectSquare(row, col) {
    if(!this.state.game.gameField[row][col]) {
      if(this.state.game.gameDuration === 0 && this.state.game.turn === "owner") {
        this.setState({timer: true});
      }

      if(this.props.match.params.secondplayer === "observer"){
        return false;
      }

      if(this.state.game.turn === "owner" && !this.props.match.params.secondplayer && !this.state.turnChanged) {
        this.setState({turnChanged: true});
        let gamesData = JSON.parse(localStorage.getItem("games"));
        let gameIndex = gamesData.findIndex(
          game => game.gameToken === this.props.match.params.gameToken
        );
        let game = gamesData[gameIndex];
        game.gameField[row][col] = 1;
        game.turn = "opponent";
        gamesData[gameIndex] = game;
        gamesData = JSON.stringify(gamesData);
        localStorage.setItem("games", gamesData);
      }

      if(this.state.game.turn === "opponent" && this.props.match.params.secondplayer && !this.state.turnChanged) {
        this.setState({turnChanged: true});
        let gamesData = JSON.parse(localStorage.getItem("games"));
        let gameIndex = gamesData.findIndex(
          game => game.gameToken === this.props.match.params.gameToken
        );
        let game = gamesData[gameIndex];
        game.gameField[row][col] = 2;
        game.turn = "owner";
        gamesData[gameIndex] = game;
        gamesData = JSON.stringify(gamesData);
        localStorage.setItem("games", gamesData);
      }

    }
  }

  timerSetup(time) {
    let sec =(time % 60000)/1000;
    let min = (time - 1000 * sec)/60000;
     return ("0" + min + " : " + sec);
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
