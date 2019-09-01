import React, {Component} from "react";


export default class List extends Component {
  // constructor(props){
  //   super(props);
  // }

  render(){
    return (
      <div className="all-list">
        {this.props.gamesList.map(
          (game, index) =>(
            <div
              key={index}
              className={`all-square ${game.state}`}
              onClick={() => this.props.selectGame(game)}
            >
              <div className="player_first">{game.owner}</div>
              <div className="player_second">{game.opponent}</div>
              <div className="time">{game.duration}</div>
            </div>
          )
        )}
      </div>
    );
  }
}
