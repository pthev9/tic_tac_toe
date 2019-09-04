import React, {Component} from "react";

export default class Timer extends Component {
  timerSetup() {
    const time = this.props.duration;
    let sec;
    let min;
    if (time) {
      sec =(time % 60000)/1000;
      min = (time - 1000 * sec)/60000;
      if(sec < 10) {
        sec = "0" + sec;
      }
      if(min < 10) {
        min = "0" + min;
      }
      return (min + " : " + sec);
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.timerSetup()}
      </div>
    )
  }
}
