import React, { Component } from "react";
import axios from "axios";

export default class TaskCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskrecords: [],
      taskids: [],
      taskinfo: {},
      taskfilter: [],
      specssn: {},
      upcoming: [],
      due: [],
      overdue: [],
    };
    this.gettasks = this.gettasks.bind(this);
    this.getIBSTs = this.getIBSTs.bind(this);
    this.getSpecsSN = this.getSpecsSN.bind(this);
    this.filterTasks = this.filterTasks.bind(this);
  }

  gettasks() {}

  getIBSTs() {
    axios.get(`http://127.0.0.1:5000/IBST`).then((response) => {
      console.log(...response.data);
      this.setState({
        taskrecords: [...response.data],
      });
      console.log("task records", this.state.taskrecords);
      this.filterTasks();
    });
  }

  getSpecsSN() {
    this.setState({ specssn: Number(this.props.specsn) });
  }

  filterTasks() {
    const taskrecords = this.state.taskrecords;
    const filteredrecords = taskrecords.filter(
      (record) => record.specs_sn === this.state.specssn
    );

    this.setState({
      taskfilter: [...filteredrecords],
    });

    console.log("task filter", this.state.taskfilter);
  }

  componentDidMount() {
    this.getSpecsSN();
    this.getIBSTs();
  }

  render() {
    return (
      <div>
        <h1>Task Calculator</h1>
        <div>{}</div>
      </div>
    );
  }
}
