import React, {Component} from 'react';
import './App.css';
import Main from "./Main";
import Game from "./Game";
import GamesList from "./GamesList";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  render(){
    return (
      <Router>
        <Route path="/" component={Main} />
        <Route path="/gameslist" component={GamesList}/>
        <Route path="/game/:gameToken/:secondplayer?" component={Game}/>
        <Link to="/gameslist">GamesList</Link>
      </Router>
    )
  }
}
