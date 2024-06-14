import React, { Component } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import lodash from "lodash";

import TaskManager from "./task-container";

export default class TaskCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskrecords: [],
      taskids: [],
      taskinfo: [],
      tasksnfiltered: [],
      specssn: {},
      upcoming: [],
      due: [],
      overdue: [],
      finalupcoming: [],
      finaldue: [],
      finaloverdue: [],
      uptaskentries: [],
      duetaskentries: [],
      overduetaskentries: [],
      odentries: [],
    };

    this.getIBSTs = this.getIBSTs.bind(this);
    this.getSpecsSN = this.getSpecsSN.bind(this);
    this.filterByDate = this.filterByDate.bind(this);
    this.getUpTaskInfo = this.getUpTaskInfo.bind(this);
    this.getDueTaskInfo = this.getDueTaskInfo.bind(this);
    this.getOverTaskInfo = this.getOverTaskInfo.bind(this);
    this.combineUpTaskInfo = this.combineUpTaskInfo.bind(this);
    this.combineDueTaskInfo = this.combineDueTaskInfo.bind(this);
    this.combineOverTaskInfo = this.combineOverTaskInfo.bind(this);
   
  }
  getSpecsSN() {
    this.setState({ specssn: Number(this.props.specsn) });
  }
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
        this.setState(
          {
            finalupcoming: [response.data].concat(this.state.finalupcoming),
          },
          () => {
            this.combineUpTaskInfo();
          }
        );
      });
    });
  }
  getDueTaskInfo() {
    const duetaskid = this.state.due.map((record) => {
      return record.task_id;
    });
    const duetaskrec = duetaskid.forEach((record) => {
      axios.get(`http://127.0.0.1:5000/Task/${record}`).then((response) => {
        this.setState(
          {
            finaldue: [response.data].concat(this.state.finaldue),
          },
          () => {
            this.combineDueTaskInfo();
          }
        );
      });
    });
  }
  getOverTaskInfo() {
    const odtaskid = this.state.overdue.map((record) => {
      return record.task_id;
    });
    const odtaskrec = odtaskid.forEach((record) => {
      axios.get(`http://127.0.0.1:5000/Task/${record}`).then((response) => {
        this.setState(
          {
            finaloverdue: [response.data].concat(this.state.finaloverdue),
          },
          () => {
            this.combineOverTaskInfo();
          }
        );
      });
    });
  }

  combineUpTaskInfo() {
    const settaskid = _.keyBy(this.state.upcoming, "task_id");
    const setIBSTid = _.keyBy(this.state.finalupcoming, "id");
    const combineentries = _.merge(settaskid, setIBSTid);
    this.setState({
      uptaskentries: combineentries,
    });
  }
  combineDueTaskInfo() {
    const settaskid = _.keyBy(this.state.due, "task_id");
    const setIBSTid = _.keyBy(this.state.finaldue, "id");
    const combineentries = _.merge(settaskid, setIBSTid);
    this.setState({
      duetaskentries: combineentries,
    });
  }
  combineOverTaskInfo() {
    const settaskid = _.keyBy(this.state.overdue, "task_id");
    const setIBSTid = _.keyBy(this.state.finaloverdue, "id");
    const combineentries = _.merge(settaskid, setIBSTid);

    this.setState({
      overduetaskentries: combineentries,
    });
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
            upcoming={this.state.uptaskentries}
            due={this.state.duetaskentries}
            overdue={this.state.overduetaskentries}
          />
        </div>
      </div>
    );
  }
}
