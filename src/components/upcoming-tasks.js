import React, { Component } from "react";
import axios from "axios";
import { DateTime } from "luxon";

import TaskManager from "./task-container";

export default class TaskCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskrecords: [],
      taskids: [],
      taskinfo: {},
      tasksnfiltered: [],
      specssn: {},
      upcoming: [],
      due: [],
      overdue: [],
      finalupcoming: [],
      finaldue: [],
      finaloverdue: [],
    };
    this.gettasks = this.gettasks.bind(this);
    this.getIBSTs = this.getIBSTs.bind(this);
    this.getSpecsSN = this.getSpecsSN.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.getUpTaskInfo = this.getUpTaskInfo.bind(this);
    this.getDueTaskInfo = this.getDueTaskInfo.bind(this);
    this.getOverTaskInfo = this.getOverTaskInfo.bind(this);
  }

  gettasks() {}

  getIBSTs() {
    axios.get(`http://127.0.0.1:5000/IBST`).then((response) => {
      this.setState({
        taskrecords: [...response.data],
      });
      const taskrecords = this.state.taskrecords;
      const filteredrecords = taskrecords.filter(
        (record) => record.specs_sn === this.state.specssn
      );

      this.setState({
        tasksnfiltered: [...filteredrecords],
      });
      this.filterByDate();
      this.getUpTaskInfo();
      this.getDueTaskInfo();
      this.getOverTaskInfo();
    });
  }

  filterByDate() {
    const Today = new DateTime.now();
    const thirtyday = Today + 2592000000;
    const sevenday = Today + 604800000;
    const oneday = Today + 86400000;
    const machinerecords = this.state.tasksnfiltered;

    //checking for records between 8 and 30 days

    const upcoming = machinerecords.filter(
      (record) =>
        DateTime.fromISO(record.nextdue) <= thirtyday &&
        DateTime.fromISO(record.nextdue) >= sevenday
    );

    {
      this.setState({ upcoming: [...upcoming] });
    }

    //checking for records between 1 and 7 days
    const due = machinerecords.filter(
      (record) =>
        DateTime.fromISO(record.nextdue) <= sevenday &&
        DateTime.fromISO(record.nextdue) >= oneday
    );

    {
      this.setState({ due: [...due] });
    }
    //checking if record is past its due date
    const overdue = machinerecords.filter(
      (record) => DateTime.fromISO(record.nextdue) <= oneday
    );
    {
      this.setState({ overdue: [...overdue] });
    }
  }

  getUpTaskInfo() {
    const uptaskid = this.state.upcoming.map((record) => {
      return record.task_id;
    });
    const uptaskrec = uptaskid.forEach((record) => {
      axios.get(`http://127.0.0.1:5000/Task/${record}`).then((response) => {
        this.setState({
          finalupcoming: [response.data].concat(this.state.finalupcoming),
        });
      });
    });
  }
  getDueTaskInfo() {
    const duetaskid = this.state.due.map((record) => {
      return record.task_id;
    });
    const duetaskrec = duetaskid.forEach((record) => {
      axios.get(`http://127.0.0.1:5000/Task/${record}`).then((response) => {
        this.setState({
          finaldue: [response.data].concat(this.state.finaldue),
        });
      });
    });
  }
  getOverTaskInfo() {
    const odtaskid = this.state.overdue.map((record) => {
      return record.task_id;
    });
    const odtaskrec = odtaskid.forEach((record) => {
      axios.get(`http://127.0.0.1:5000/Task/${record}`).then((response) => {
        
        this.setState({
          finaloverdue: [response.data].concat(this.state.finaloverdue),
        })
      });
    });
    

    
  }

  getSpecsSN() {
    this.setState({ specssn: Number(this.props.specsn) });
  }

  componentDidMount() {
    this.getSpecsSN();
    this.getIBSTs();
  }

  render() {
    return (
      <div>
        <div>
          <TaskManager
            upcoming={this.state.upcoming}
            due={this.state.due}
            overdue={this.state.overdue}
          />
        </div>
      </div>
    );
  }
}
