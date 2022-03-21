import React, { Component } from "react";
import WashingMachine from "../components/WashingMachine";
import "../css/laundryMain.css";
import Label from "../components/Label";
export default class LaundryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.getMachineData();
  }
  getMachineData = () => {};
  render() {
    return (
      <div className="LaundryMain">
        <div className="set-flex-content-center">
          <Label />
        </div>
        <div className="set-gird-LaundryMain-page set-flex-LaundryMain-page">
          <WashingMachine machineColor="#00FFB2" machineNumber="A" />
          <WashingMachine machineColor="#89A3FF" machineNumber="B" />
          <WashingMachine machineColor="#DD7BFF" machineNumber="C" />
          <WashingMachine machineColor="#FFFFFF" machineNumber="D" />
          <WashingMachine machineColor="#FFD809" machineNumber="E" />
          <WashingMachine machineColor="#00FFFF" machineNumber="F" />
        </div>
      </div>
    );
  }
}
