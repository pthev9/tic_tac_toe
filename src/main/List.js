import React, {Component} from "react";
import Players from "./Players"
import Timer from ".././common/Timer";

export default class List extends Component {
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
                result={game.result}
                owner={game.owner}
                opponent={game.opponent}
              />
              <Timer
                className="timer-list"
                duration={game.duration}
              />
            </div>
          )
        )}
      </div>
    );
  }
}
