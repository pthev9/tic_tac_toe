import React, {Component} from "react";

export default class Timer extends Component {
  timerSetup() {
    let time = this.props.duration;
    let sec =(time % 60000)/1000;
    let min = (time - 1000 * sec)/60000;
    return ("0" + min + " : " + sec);
  }

  render() {
    return (
      <div
        className="timer"
      >
        {this.timerSetup()}
      </div>
    )
  }
}
