import React, { Component } from "react";
import "../css/coin.css";

export default class Coin extends Component {
  render() {
    return (
      <div className="coin-box set-coin-text-center">
        <div className="set-flex-of-coin">
          <div
            id={this.props.coinID}
            style={
              this.props.disableDuplicateCoin
                ? { display: "none" }
                : { background: this.props.coinColor }
            }
            className={`Coin set-coin-text-center yes-drop${this.props.machineNumber} drag-drop${this.props.machineNumber} coin-main set-absolute`}
          >
            {this.props.valueOfCoin}
          </div>
          <div
            id={this.props.coinID}
            style={{ background: this.props.coinColor }}
            className="Coin set-coin-text-center"
          >
            {this.props.valueOfCoin}
          </div>
        </div>
        <div className="Amount-of-coin">{this.props.AmountOfCoin}</div>
      </div>
    );
  }
}
