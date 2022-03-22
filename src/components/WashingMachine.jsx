import React, { Component } from "react";
import "../css/washingMachine.css";
import Vending from "./Vending.jsx";
export default class WashingMachine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinCount: 0,
      machineColor: {
        background: props.machineColor,
      },
      lightActive: false,
      activeAnimate: false,
      minutes: 0,
      timer: "0:0:0",
      openVending: false,
    };
  }
  // componentDidMount() {}
  clickKy = () => {
    console.log(`machine: ${this.props.machineNumber}`);
    this.setState({ openVending: true });
  };
  callBackFromVending = (data) => {
    this.setState({ openVending: data.ticker });
    this.setState({ lightActive: true, activeAnimate: true });
    this.countDown();
  };
  callBackCoinCountChange = (data) => {
    this.setState({ coinCount: data.coinCount, minutes: data.coinCount * 2 });
  };
  countDown = () => {
    let milisec = this.state.minutes * 60 * 1000;
    let timeCount = setInterval(() => {
      var distance = (milisec -= 1000);
      //   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.updateCoin(minutes, seconds);
      this.setState({ timer: hours + ":" + minutes + ":" + seconds });

      if (distance === 0) {
        this.setState({ lightActive: false, activeAnimate: false});
        clearInterval(timeCount);
      }
    }, 1000);
  };
  updateCoin = (minutes, seconds) => {
    // 1 coin per 2 minutes
    if (minutes % 2 === 0 && seconds === 0) {
      //   console.log(minutes);
      this.setState({ coinCount: this.state.coinCount - 1 });
    }
  };
  render() {
    //---varaible---
    let lightColor;
    let vendingCompo;
    //----function----
    const setLightColor = (color) => {
      return { background: color };
    };
    //-----condition----------
    if (this.state.lightActive) {
      lightColor = setLightColor("#52ff00");
    } else {
      lightColor = setLightColor("red");
    }
    return (
      <div className="WashingMachine">
        <Vending
          updateCurrentCoin={this.state.coinCount}
          machineNumber={this.props.machineNumber}
          ShowDialog={this.state.openVending}
          CallBack={this.callBackFromVending}
          CallBackCoinCountChange={this.callBackCoinCountChange}
        />
        <div style={this.state.machineColor} className="machine-body">
          <div className="timer set-flex-content-center">
            <p>{this.state.timer}</p>
          </div>
          <div style={lightColor} className="active-light"></div>
          <div className="set-flex-end">
            <div className="set-flex-content-center set-margin-glass">
              <div className="glass-border"></div>
              <div
                className={
                  this.state.activeAnimate
                    ? "glass set-animate-rotate set-flex-content-center"
                    : "glass set-flex-content-center"
                }
              >
                <h1>{this.props.machineNumber}</h1>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={this.clickKy}
          className="vending set-flex-content-center-colum"
        >
          <div className="black-plate set-flex-content-center-colum">
            <div className="vending-box"></div>
            <div className="btn"></div>
          </div>
          <div className="coin-count set-flex-content-center">
            <p>{this.state.coinCount}</p>
          </div>
        </div>
      </div>
    );
  }
}
