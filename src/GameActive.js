import React from "react";

class GameActive extends React.Component{
  render(){
    return <p>{this.props.match.params.gameToken}</p>;
  }
}
export default GameActive;
