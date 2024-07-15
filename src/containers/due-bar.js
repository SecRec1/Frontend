import React, { Component } from "react";

import Styles from "../style/app.scss";

import TaskList from "../components/task-list";

import TaskItem from "../components/task-item";

export default class DueBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      duetasks: {},
    };
    const setTasks = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.setState({ duetasks: this.props.duetasks }));
      }, 100);
      setTimeout(() => {
        resolve(this.duetaskItems());
      }, 100);
    });

    this.duetaskItems = this.duetaskItems.bind(this);
  }

  duetaskItems() {
    const entries = this.state.duetasks;
    _.forEach(
      (entries, "id"),
      <TaskItem key={entries.sn} entries={[entries]} />
    );
  }

  render() {
    return (
      <div className="Due_container">
        <button onClick={this.props.showHideDue} className="Due button">
        Maint Due within 7 Days
        </button>
        <div id="Due" className="Due-content">
          <label className="task-label">Task</label>
          <label className="lastdone-label">Last Completed</label>
          <TaskList tasks={this.state.duetasks} />
        </div>
      </div>
    );
  }
}
