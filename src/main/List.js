import React, {Component} from "react";
import Players from "./Players"

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
              <Players
                winner={game.result}
                owner={game.owner}
                opponent={game.opponent}
              />
              <div className="time">{game.duration}</div>
            </div>
          )
        )}
      </div>
    );
  }
}
