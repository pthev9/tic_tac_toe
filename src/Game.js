import React, {Component} from "react";

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: {
        gameField: [0,0,0,0,0,0,0,0,0],
        owner: "",
        opponent: ""
      }
    };
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this._isMounted = false;
  }
  getSquareFilling (square) {
    if (square === 1) {
      return "game-square cross"}
    if (square === 2) {
      return "game-square null"}
    else return "game-square";
  }
  gameDataRefresh () {
      let games = localStorage.getItem("games");
      games = JSON.parse(games);
      // console.log(games);
      let gameData = games.find(
        game => game.gameToken === this.props.match.params.gameToken
      );
      this.setState({game: gameData});
  }

  componentDidMount() {
    this._isMounted = true;
    setInterval(this.gameDataRefresh, 5000)
  }
  componentWillUnmount() {
   this._isMounted = false;
  }
  render(){
    let data = this.state.game;
    // let grid = this.state.game[0];
    // console.log ("отрисовался!");
    console.log (this.state.game);

    return (
      <div>
        <div className="player-first" value={data.owner} disabled />
        <div className="player-second" value={data.opponent} disabled />
        <div className="game-field">
          {this.state.game.gameField.map(
            (square, index) =>(
              <div
                key={index}
                className={this.getSquareFilling(square)}
                onClick={()=> {
                  this.setState ({selectSquare: index})
                }}
              >
              </div>
            )
          )}
        </div>
        <div className="timer">{data.gameDuration}</div>
      </div>
    )
  }
}
