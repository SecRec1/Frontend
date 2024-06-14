import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Styles from "../style/app.scss";


import TaskList from "../components/task-list";

import TaskItem from "../components/task-item";

export default class UpcomingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uptasks: {},
    };
    const setTasks = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.setState({ uptasks: this.props.uptasks }));
      }, 100);
      setTimeout(() => {
        resolve(this.uptaskItems());
      }, 100);
    });

    this.uptaskItems = this.uptaskItems.bind(this);
  }

  uptaskItems() {
    const entries = this.state.uptasks;
    _.forEach(
      (entries, "id"),
      <TaskItem key={entries.sn} entries={[entries]} />
    );
  }

  render() {
    return (
      <div className="Upcoming_container">
        <button onClick={showHideUpcoming} className="Upcoming button">
          Upcoming Maint within 30 Days
        </button>
        <div id="Upcoming" className="Upcoming-content">
          <label className="task-label">Task</label>
          <label className="lastdone-label">Last Completed</label>
          <TaskList tasks={this.state.uptasks} />
        </div>
      </div>
    );
  }
}
function showHideUpcoming() {
  var overdue = document.getElementById("Upcoming");
  overdue.classList.toggle("show");
}