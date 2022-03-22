const machine = require("./machine_mock.json");
const user = require("./user.json");
const machineTimeer = require("./machine_timer.json");

module.exports = () => ({
  machine: machine,
  user: user,
  machineTimeer: machineTimeer,
});
