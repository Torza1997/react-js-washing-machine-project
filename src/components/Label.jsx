import React, { Component } from "react";
import "../css/label-laundry.css";
import Banner from "../image/icon.svg";
export default class Label extends Component {
  render() {
    return (
      <div className="Label-laundry set-flex-content-center">
        <div>
          T <img className="imgSize" src={Banner} /> Laundry
        </div>
      </div>
    );
  }
}
