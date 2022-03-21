import React, { Component } from "react";
import "../css/vending.css";
import Coin from "./Coin";
import interact from "interactjs";
import $ from "jquery";
export default class Vending extends Component {
  componentDidMount() {
    this.ignoredInteractWhenTouchCoin();
    this.dragAndDrop();
  }
  ignoredInteractWhenTouchCoin = () => {
    $("body .Coin ").on("touchmove", function (event) {
      event.preventDefault();
    });
  };
  dragAndDrop = () => {
    //get Event Target For Return Position Coin
    interact(".dropzone").dropzone({
      accept: ".yes-drop",
      overlap: 0.75,
      ondropactivate: function () {
        // console.log("add active dropzone feedback");
      },
      ondragenter: function () {
        // console.log("feedback the possibility of a drop");
      },
      ondragleave: function () {
        // console.log("remove the drop feedback style");
      },
      ondrop: function () {
        console.log("droped");
      },
      ondropdeactivate: function () {
        // console.log("remove active dropzone feedback");
      },
    });

    const position = { x: 0, y: 0 };
    interact(".drag-drop").draggable({
      modifiers: [
        interact.modifiers.restrictRect({
          // restriction: "parent",
          // endOnly: true,
        }),
      ],
      listeners: {
        start(event) {
          console.log(event.type, event.target.id);
        },
        move(event) {
          position.x += event.dx;
          position.y += event.dy;
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
  getCallBackToParrent = () => {
    this.props.CallBack({ ticker: false });
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
            <div className="row1  set-flex-content-center">
              <div className="col1 set-flex-content-center">
                <div className="slot dropzone"></div>
                <div className="yelloBtn"></div>
              </div>
              <div className="col2">
                <Coin
                  coinID="coin10"
                  valueOfCoin={10}
                  coinColor="#FF9C09"
                  AmountOfCoin={999}
                />
                <Coin
                  coinID="coin5"
                  valueOfCoin={5}
                  coinColor="#e4d1cf"
                  AmountOfCoin={999}
                />
                <Coin
                  coinID="coin2"
                  valueOfCoin={2}
                  coinColor="#FF7D75"
                  AmountOfCoin={999}
                />
              </div>
            </div>
            <div className="row2 ">
              <div className="col1 set-flex-content-center">
                <div className="coin-for-fill">
                  
                </div>
              </div>
              <div className="col2"></div>
            </div>
            <div className="row3 set-flex-content-center">
              <div className="col1">
                <ul>
                  <li>start 30 baht/hr</li>
                  <li>extend the time 1 baht/minute</li>
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
