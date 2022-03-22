import React, { Component } from "react";
import "../css/vending.css";
import Coin from "./Coin";
import interact from "interactjs";
import $ from "jquery";
import api from "../api/api.js";

export default class Vending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropCheck: false,
      coinCount: 0,
      ten_coin: 0,
      five_coin: 0,
      two_coin: 0,
    };
  }
  componentDidMount() {
    this.getUserInfo();
    this.dragAndDrop(this.props.machineNumber);
    this.ignoredInteractWhenTouchCoin();
  }
  ignoredInteractWhenTouchCoin = () => {
    $("body .Coin ").on("touchmove", function (event) {
      event.preventDefault();
    });
  };
  dragAndDrop = (Mnum) => {
    let coinType;
    interact(`.dropzone${Mnum}`).dropzone({
      accept: `.yes-drop${Mnum}`,
      overlap: 0.75,
      ondropactivate: () => {
        // console.log("add active dropzone feedback");
      },
      ondragenter: () => {
        // console.log("feedback the possibility of a drop");
      },
      ondragleave: () => {
        // console.log("remove the drop feedback style");
      },
      ondrop: () => {
        if (coinType === "coin10") {
          this.setState({
            coinCount: (this.state.coinCount += 10),
            ten_coin: this.state.ten_coin - 1,
          });
        } else if (coinType === "coin5") {
          this.setState({
            coinCount: (this.state.coinCount += 5),
            five_coin: this.state.five_coin - 1,
          });
        } else if (coinType === "coin2") {
          this.setState({
            coinCount: (this.state.coinCount += 2),
            two_coin: this.state.two_coin - 1,
          });
        }
        this.props.CallBackCoinCountChange({ coinCount: this.state.coinCount });
      },
      ondropdeactivate: () => {
        // console.log("remove active dropzone feedback");
      },
    });
    const position = { x: 0, y: 0 };
    interact(`.drag-drop${Mnum}`).draggable({
      listeners: {
        // start(event) {
        // },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;
          coinType = event.target.id;
          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
        end(event) {
          position.x = 0;
          position.y = 0;
          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
      },
    });
  };
  getUserInfo = () => {
    api
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
  };
  upDateCoin = () => {
    api
      .updateCoin({
        ten_coin: this.state.ten_coin,
        five_coin: this.state.five_coin,
        two_coin: this.state.two_coin,
      })
      .then((res) => {
        console.log("updated coin success!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getCallBackToParrent = () => {
    this.upDateCoin();
    this.props.CallBack({ ticker: false});
  };
  closePopup = () => {
    this.props.CallBack({ ticker: false, closePopupOnly: true });
  };
  render() {
    let disPlay;
    if (!this.props.ShowDialog) {
      disPlay = {
        display: "none",
      };
    }
    return (
      <div
        style={disPlay}
        className="Vending-container set-flex-content-center"
      >
        <div className="Vending-bg">
          <div className="Vending">
            <div className="set-flex-end-closeBtn">
              <div
                onClick={this.closePopup}
                className="closeBtn set-flex-content-center"
              >
                X
              </div>
            </div>
            <div className="row1  set-flex-content-center">
              <div className="col1 set-flex-content-center">
                <div
                  className={`slot dropzone${this.props.machineNumber}`}
                ></div>
                <div className="yelloBtn"></div>
              </div>
              <div className="col2">
                <Coin
                  coinID="coin10"
                  machineNumber={this.props.machineNumber}
                  valueOfCoin={10}
                  coinColor="#FF9C09"
                  AmountOfCoin={this.state.ten_coin}
                />
                <Coin
                  coinID="coin5"
                  machineNumber={this.props.machineNumber}
                  valueOfCoin={5}
                  coinColor="#e4d1cf"
                  AmountOfCoin={this.state.five_coin}
                />
                <Coin
                  coinID="coin2"
                  machineNumber={this.props.machineNumber}
                  valueOfCoin={2}
                  coinColor="#FF7D75"
                  AmountOfCoin={this.state.two_coin}
                />
              </div>
            </div>
            <div className="row2 ">
              <div className="col1 set-flex-content-center">
                <div className="coin-for-fill">
                  {this.props.updateCurrentCoin > 0
                    ? this.props.updateCurrentCoin
                    : this.state.coinCount}
                </div>
              </div>
              <div className="col2"></div>
            </div>
            <div className="row3 set-flex-content-center">
              <div className="col1">
                <ul>
                  <li>start 30 baht/hr</li>
                  <li>extend the time 1 baht/ 2 minute</li>
                </ul>
              </div>
              <div className="col2 set-flex-content-center">
                <div onClick={this.getCallBackToParrent} className="btnStart">
                  Start
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
