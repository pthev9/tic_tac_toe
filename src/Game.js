import React, {Component} from "react";

export default class Game extends Component {
  constructor() {
    super();
    this.State = {};
  }

  render(){
    let grid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className="game-field">
        {grid.map(
          (square, index) =>(
            <div
              key={index}
              className="game-square"
              onClick={()=> {
                this.setState ({selectSquare: index})
              }}
            >
            </div>
          )
        )}
      </div>
    )
  }
}
