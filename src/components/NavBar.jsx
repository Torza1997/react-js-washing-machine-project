import React, { Component } from "react";
import "../css/NavBar.css";
import Avata from "./Avata";
import Me from "../image/me.jpg";
import Banner from "../image/icon.svg";
import api from "../api/api.js";
export default class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      ten_coin: 0,
      five_coin: 0,
      two_coin: 0,
    };
  }
  componentDidMount() {
    api
      .getUser()
      .then((data) => {
        this.setState({
          userName: data[0].name,
          ten_coin: data[0].coin.ten_coin,
          five_coin: data[0].coin.five_coin,
          two_coin: data[0].coin.two_coin,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    return (
      <div className="NavBar set-flex-nabar">
        <div className="coin-container">
          <div className="banner">
            <img className="banner-icon" src={Banner} />
            <p>Laundry</p>
          </div>
        </div>
        <div className="set-flex-nabar">
          <Avata
            TenCoin={this.state.ten_coin}
            FiveCoin={this.state.five_coin}
            TwoCoin={this.state.two_coin}
            ImageAvata={Me}
            YourName={this.state.userName}
            DisplayNoneOfCoin={false}
            DiplayNoneOfName={false}
          />
        </div>
      </div>
    );
  }
}
