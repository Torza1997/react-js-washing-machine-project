import React, { Component } from "react";
import WashingMachine from "../components/WashingMachine";
import "../css/laundryMain.css";
import Label from "../components/Label";
import api from "../api/api";
export default class LaundryMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      washingMachine: [],
    };
  }
  componentDidMount() {
    this.getMachine();
  }
  getMachine = () => {
    api
      .getWashingMachine()
      .then((res) => {
        const washingMachine = res.data?.Washing_Machine;
        if (washingMachine?.length !== 0) {
          this.setState({ washingMachine: washingMachine });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    return (
      <div className="LaundryMain">
        <div className="set-flex-content-center">
          <Label />
        </div>
        <div className="set-gird-LaundryMain-page set-flex-LaundryMain-page">
          {this.state.washingMachine.map((item, index) => {
            return (
              <WashingMachine
                key={index}
                machineColor={item.machine_color}
                machineNumber={item.machine_name}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
