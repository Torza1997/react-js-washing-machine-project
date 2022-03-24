import React, { Component } from "react";
import "../css/vending.css";
import Coin from "./Coin";
import interact from "interactjs";
import $ from "jquery";
export default class Vending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChangeSlotBg: false,
      minCoin: 2,
    };
  }
  componentDidMount() {
    this.dragAndDrop(this.props.machineNumber);
    this.ignoredInteractWhenTouchCoin();
  }
  getCallBackToParrent = () => {
    if (
      this.props.MachineActive ||
      this.props.updateCurrentCoin < this.state.minCoin
    ) {
    } else {
      this.props.CallBackMachineActive({ machineActive: true });
      this.props.CallBack({ ticker: false });
    }
  };
  closePopup = () => {
    this.props.CallBack({ ticker: false, closePopupOnly: true });
  };
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
      ondropactivate: () => {},
      ondragenter: () => {
        this.setState({ ChangeSlotBg: true });
      },
      ondragleave: () => {
        this.setState({ ChangeSlotBg: false });
      },
      ondrop: () => {
        this.props.CallBackGetCoinType(coinType);
        this.setState({ ChangeSlotBg: false });

        // if (this.props.MachineActive) {
        // } else {
        //   this.props.CallBackGetCoinType(coinType);
        // }
      },
      ondropdeactivate: () => {},
    });
    const position = { x: 0, y: 0 };
    interact(`.drag-drop${Mnum}`).draggable({
      listeners: {
        start() {},
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
  render() {
    let disPlay;
    let changeColorBtnStart;
    let slotBgColor;
    if (!this.props.ShowDialog) {
      disPlay = {
        display: "none",
      };
    }
    if (
      this.props.MachineActive ||
      this.props.updateCurrentCoin < this.state.minCoin
    ) {
      changeColorBtnStart = {
        background: "#757575",
      };
    }
    if (this.state.ChangeSlotBg) {
      slotBgColor = {
        background: `#6f00ff`,
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
                  style={slotBgColor}
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
                  AmountOfCoin={this.props.UserCoin.ten_coin}
                />
                <Coin
                  coinID="coin5"
                  machineNumber={this.props.machineNumber}
                  valueOfCoin={5}
                  coinColor="#e4d1cf"
                  AmountOfCoin={this.props.UserCoin.five_coin}
                />
                <Coin
                  coinID="coin2"
                  machineNumber={this.props.machineNumber}
                  valueOfCoin={2}
                  coinColor="#FF7D75"
                  AmountOfCoin={this.props.UserCoin.two_coin}
                />
              </div>
            </div>
            <div className="row2 ">
              <div className="col1 set-flex-content-center">
                <div className="coin-for-fill">
                  {this.props.updateCurrentCoin}
                </div>
              </div>
              <div className="col2"></div>
            </div>
            <div className="row3 set-flex-content-center">
              <div className="col1">
                <ul>
                  <li>start {this.state.minCoin} baht</li>
                  <li>extend the time 1 baht/ 2 minute</li>
                </ul>
              </div>
              <div
                style={changeColorBtnStart}
                className="col2 set-flex-content-center"
              >
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
