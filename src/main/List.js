import React, {Component} from "react";


export default class List extends Component {
  constructor(props){
    super(props);

  }

  selectGame(game){
    switch(game.state) {
      case "ready":
        this.joiningPlayer(game);
        break;
      case "playing":
        this.joiningObserver(game);
        break;
      case "done":
        alert("this game is over");
        break;
      default:
        console.log("game.state undefined");
    }
  }

  joiningObserver(game){
    this.setState({
      gameToken: game.gameToken + "/observer",
      redirect: true
    });
  }

  joiningPlayer(game) {
    if(this.state.username) {
      this.setState({
        gameToken: game.gameToken + "/" + this.state.username ,
        redirect: true
      });
    }
    else alert("Enter name");
  }

  render(){
  return (
    <div className="all-list">
      {this.props.gamesList.map(
        (game, index) =>(
          <div
            key={index}
            className={`all-square ${game.state}`}
            onClick={this.selectGame(game)}
          >
            <div className="player">{game.owner}</div>
            <div className="player">{game.opponent}</div>
            <div className="timer">{game.duration}</div>
          </div>
        )
      )}
    </div>
  );
  }
}
