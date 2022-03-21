import React, { Component } from "react";
import "../css/NavBar.css";
import Avata from "./Avata";
import Me from "../image/me.jpg";
import Banner from "../image/icon.svg";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myName: "Tor thanatos",
    };
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
            ImageAvata={Me}
            YourName={this.state.myName}
            DisplayNoneOfCoin={false}
            DiplayNoneOfName={false}
          />
        </div>
      </div>
    );
  }
}
