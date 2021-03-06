import React, {Component} from 'react';
import Header from "./common/Header";
import './App.css';
import Main from "./main/Main";
import Game from "./game/Game";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render(){
    return (
      <Router>
        <Header/>
        <Route exact path="/" component={Main} />
        <Route path="/game/:gameToken/:secondPlayer?" component={Game}/>
      </Router>
    )
  }
}
