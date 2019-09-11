import React, {Component} from "react";

class Square extends Component {
  getSquareFilling(square) {
    if (square === 1) {
      return "game-square cross"}
    else if (square === 2) {
      return "game-square null"}
    else
      return "game-square";
  }

  render() {
    return (
      (this.props.row).map((square, index) =>
        <div
          key      ={index}
          className={this.getSquareFilling(square)}
          onClick  ={() =>
            this.props.selectSquare(this.props.rowIndex, index)}
        >
          {index}
        </div>
      )
    )
  }
}

export default Square;
