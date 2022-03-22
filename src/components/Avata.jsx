import React, { Component } from "react";
import "../css/avata.css";
import Coin from "./Coin";
export default class Avata extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  setDiplayNone = (checker) => {
    if (checker) {
      return { display: "none" };
    }
  };
  render() {
    // console.log("this is image path:"+this.props.ImageAvata)
    const getImg = this.props.ImageAvata;
    const setBG = {
      backgroundImage: `url(${getImg})`,
    };
    let setDiplayNoneofCoin = this.setDiplayNone(this.props.DisplayNoneOfCoin);
    let setDiplayNoneOfName = this.setDiplayNone(this.props.DiplayNoneOfName);
    return (
      <div className="Avata">
        <div className="yourName">
          <div style={setDiplayNoneOfName}>{this.props.YourName}</div>
          <div style={setDiplayNoneofCoin} className="your-coin">
            <Coin
              disableDuplicateCoin={true}
              valueOfCoin={10}
              coinColor="#FF9C09"
              AmountOfCoin={this.props.TenCoin}
            />
            <Coin
              disableDuplicateCoin={true}
              valueOfCoin={5}
              coinColor="#e4d1cf"
              AmountOfCoin={this.props.FiveCoin}
            />
            <Coin
              disableDuplicateCoin={true}
              valueOfCoin={2}
              coinColor="#FF7D75"
              AmountOfCoin={this.props.TwoCoin}
            />
          </div>
        </div>
        <div className="Avata-container">
          <div className="BgColor"></div>
          <div style={setBG} className="ImageProfile"></div>
        </div>
      </div>
    );
  }
}
