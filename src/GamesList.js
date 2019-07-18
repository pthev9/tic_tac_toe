import React from 'react';
// import responseGamesList from "./responseGamesList";
import {Redirect} from "react-router-dom";

export default class GamesList extends React.Component {
  constructor() {
    super()
    this.state = {
      games: [],
      redirect: false
    }
    this.gameDataRefresh = this.gameDataRefresh.bind(this);
    this.userNameChange = this.userNameChange.bind(this);
    this.createNewGame = this.createNewGame.bind(this);
    this._isMounted = false;
  }
  createNewGame() {
    if(this.state.username) {
      let gameToken = this.state.username.replace(/\s+/g, '') + Date.now();
      console.log(gameToken);
      let newGame = {gameToken: gameToken,
        owner: this.state.username,
        opponent: "",
        size: 3,
        gameDuration: 0,
        gameResult: "" ,
        state: "ready",
        turn: "owner",
        gameField: [1,0,0,0,0,0,0,0,2]
      }
      this.setState({gameToken: gameToken, redirect: true})
      let games = localStorage.getItem("games");
      games = JSON.parse(games);
      games = games.concat(newGame);
      games = JSON.stringify(games);
      localStorage.setItem("games", games);

    }
    else alert("Enter name");
  }
  gameDataRefresh() {
    let games = localStorage.getItem("games");
    games = JSON.parse(games);
      // console.log(games);
    this.setState({games: games});
  }

  componentDidMount() {
    this._isMounted = true;
    setInterval(this.gameDataRefresh, 5000);
  }
  componentWillUnmount() {
   this._isMounted = false;
  }
  userNameChange(event) {
    this.setState({username: event.target.value});
  }
  render(){
    // let games = responseGamesList;
    // games = JSON.stringify(games);
    // localStorage.setItem("games", games);
    // let games = localStorage.getItem("games");
    // games = JSON.parse(games);


    if (this.state.redirect) {
      let path = "/game/" + this.state.gameToken;
      return (<Redirect to={path}/>)
    }

    else {
      let games = this.state.games;
      return (
        <div>
          <input
            className="input-name"
            type="text"
            placeholder="Enter name"
            onChange={this.userNameChange}
          />
          <button
            className="button"
            onClick={this.createNewGame}
          >
            Create new game
          </button>
          <div className="all-list">
            {games.map(
              (square, index) =>(
                <div
                  key={index}
                  className="all-square"
                  state={square.state}
                  onClick={()=>{
                    this.setState({gameToken: square.gameToken, redirect: true});
                  }}
                >
                  <div className="player">{square.owner}</div>
                  <div className="player">{square.opponent}</div>
                  <div className="time">{square.gameDuration}</div>
                </div>
              )
            )}
          </div>
        </div>
      )
    }
  }
}
