import React, {Component} from 'react';
import './App.css';
import Game from "./Game"
import GamesList from "./GamesList"
import responseGamesList from "./responseGamesList"

class App extends Component {
  constructor(){
    super();
    this.State ={
      games: []
    }
  }
  componentDidMount(){
    this.setState({games: responseGamesList});
  }


  render(){
    let state = this.State.games;
    return (
      <div className="App">

        <header className="header">Крестики Нолики</header>

        <div className="main">

          <input
            className="input-name"
            type="text"
            placeholder="Enter name"/>
          <button
            className="button"
            onClick={this.createNewGame}>
            Create new game</button>
          <GamesList />

        </div>

      </div>
    );
  }
  // function createNewGame() {
  //   let newPlayer = document.querySelector('.input-name').value;
  //   let arrNewPlayer = {userName: newPlayer, fieldSize: 3};
  //   let result = state.concat(arrNewPlayer);
  //   console.log(result);
  // }
}

export default App;
