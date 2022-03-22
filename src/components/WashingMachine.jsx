import React, { Component } from "react";
import "../css/washingMachine.css";
import Vending from "./Vending.jsx";
import api from "../api/api.js";
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
      [`machineActive${props.machineNumber}`]: false,
      ten_coin: 0,
      five_coin: 0,
      two_coin: 0,
      the_rest_milisec: 0,
      timerId: null,
    };
  }
  componentDidMount() {
    this.winDowOnLoad();
    this.getTheRestTime(this.props.machineNumber);
  }
  winDowOnLoad = () => {
    window.addEventListener("beforeunload", () => {
      setInterval(()=>{},5000);
      if (this.state.the_rest_milisec > 0 && this.state.timerId === null) {
        this.serverTimeCount();
      } else if (
        this.state.the_rest_milisec > 0 &&
        this.state.timerId !== null
      ) {
        this.updateTimer();
      }
    });
  };
  updateTimer = () => {
    api
      .updateTimer({
        timerId: this.state.timerId,
        machineNum: this.props.machineNumber,
        coin: this.state.coinCount,
        theRestMilisec: this.state.the_rest_milisec,
      })
      .then((res) => {
        console.log("Update successs");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  getTheRestTime = async (machineID) => {
    await api
      .getTimeByMachineId(machineID)
      .then((res) => {
        if (res.data?.[0]) {
          this.setState({
            timerId: res.data[0].id,
            the_rest_milisec: res.data[0].the_rest_milisec,
            coinCount: res.data[0].the_rest_coin,
          });
          this.callBackMachineActive({ machineActive: true });
          this.setState({ lightActive: true, activeAnimate: true });
          this.countDown();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  serverTimeCount = () => {
    api
      .seveTimer({
        washing_machine_id: this.props.machineNumber,
        coin: this.state.coinCount,
        milisec: this.state.the_rest_milisec,
      })
      .then((res) => {
        console.log("Insert new machine success");
      })
      .catch((er) => {
        console.log(er);
      });
  };
  getUserInfo = async () => {
    await api
      .getUser()
      .then((data) => {
        this.setState({
          ten_coin: data[0].coin.ten_coin,
          five_coin: data[0].coin.five_coin,
          two_coin: data[0].coin.two_coin,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    return true;
  };
  upDateCoin = async () => {
    await api
      .updateCoin({
        ten_coin: this.state.ten_coin,
        five_coin: this.state.five_coin,
        two_coin: this.state.two_coin,
      })
      .then((res) => {
        console.log(res);
        console.log("updated coin success!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  clickKy = () => {
    // console.log(`machine: ${this.props.machineNumber}`);
    if (this.state[`machineActive${this.props.machineNumber}`] === false) {
      this.setState({ coinCount: 0 });
    }
    this.getUserInfo();
    this.setState({ openVending: true });
  };
  callBackFromVending = (data) => {
    if (!data.closePopupOnly && this.state.coinCount > 0) {
      this.setState({ openVending: data.ticker });
      this.setState({ lightActive: true, activeAnimate: true });
      this.state.the_rest_milisec = this.state.coinCount * 2 * 60 * 1000;
      this.countDown();
      this.upDateCoin();
    } else {
      if (this.state[`machineActive${this.props.machineNumber}`] === false) {
        this.setState({ coinCount: 0 });
      }
      this.setState({ openVending: data.ticker });
    }
  };
  callBackMachineActive = (data) => {
    this.setState({
      [`machineActive${this.props.machineNumber}`]: data.machineActive,
    });
  };
  checkMachineActiveForFillCoin = (coinFill) => {
    if (this.state[`machineActive${this.props.machineNumber}`] === true) {
      this.setState({
        the_rest_milisec:
          this.state.the_rest_milisec + coinFill * 2 * 60 * 1000,
      });
      this.updateTimer();
    }
  };
  callBackGetCoinType = (coinType) => {
    if (coinType === "coin10") {
      if (this.state.ten_coin > 0) {
        this.setState({
          coinCount: (this.state.coinCount += 10),
          ten_coin: (this.state.ten_coin -= 1),
        });
        this.checkMachineActiveForFillCoin(10);
      }
    } else if (coinType === "coin5") {
      if (this.state.five_coin > 0) {
        this.setState({
          coinCount: (this.state.coinCount += 5),
          five_coin: (this.state.five_coin -= 1),
        });
        this.checkMachineActiveForFillCoin(5);
      }
    } else if (coinType === "coin2") {
      if (this.state.two_coin > 0) {
        this.setState({
          coinCount: (this.state.coinCount += 2),
          two_coin: (this.state.two_coin -= 1),
        });
        this.checkMachineActiveForFillCoin(2);
      }
    }
  };
  countDown = () => {
    // let milisec = this.state.coinCount * 2 * 60 * 1000;
    let timeCount = setInterval(() => {
      this.setState({
        the_rest_milisec: (this.state.the_rest_milisec -= 1000),
      });
      //   let days = Math.floor(this.state.the_rest_milisec / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (this.state.the_rest_milisec % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (this.state.the_rest_milisec % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor(
        (this.state.the_rest_milisec % (1000 * 60)) / 1000
      );

      this.updateCoin(minutes, seconds);
      this.setState({ timer: hours + ":" + minutes + ":" + seconds });

      if (this.state.the_rest_milisec === 0) {
        this.setState({ lightActive: false, activeAnimate: false });
        clearInterval(timeCount);
      }
    }, 1000);
  };
  updateCoin = (minutes, seconds) => {
    // 1 coin per 2 minutes
    if (minutes % 2 === 0 && seconds === 0) {
      this.setState({ coinCount: this.state.coinCount - 1 });
    }
  };
  render() {
    let lightColor;
    const setLightColor = (color) => {
      return { background: color };
    };
    if (this.state.lightActive) {
      lightColor = setLightColor("#52ff00");
    } else {
      lightColor = setLightColor("red");
    }
    return (
      <div className="WashingMachine">
        <Vending
          UserCoin={{
            ten_coin: this.state.ten_coin,
            five_coin: this.state.five_coin,
            two_coin: this.state.two_coin,
          }}
          CallBackGetCoinType={this.callBackGetCoinType}
          CallBackMachineActive={this.callBackMachineActive}
          MachineActive={this.state[`machineActive${this.props.machineNumber}`]}
          updateCurrentCoin={this.state.coinCount}
          machineNumber={this.props.machineNumber}
          ShowDialog={this.state.openVending}
          CallBack={this.callBackFromVending}
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
