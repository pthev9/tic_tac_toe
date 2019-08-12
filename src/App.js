import React, {Component} from 'react';
import Header from "./Header";
import './App.css';
import Main from "./main/Main";
import Game from "./game/Game";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  render(){
    return (
      <Router>
        <Header/>
        <Route exact path="/" component={Main} />
        <Route path="/game/:gameToken/:secondplayer?" component={Game}/>
        <Link to="/">main</Link>
      </Router>
    )
  }
}
