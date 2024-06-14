import React, { Component } from "react";
import axios from "axios";

import DueBar from "../containers/due-bar";
import UpcomingBar from "../containers/upcoming-bar";
import OverdueBar from "../containers/overdue-bar";

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odtasks: [],
      duetasks: [],
      uptasks: [],
    };

    const setTasks = new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          this.setState({ odtasks: this.props.overdue }),
          this.setState({ uptasks: this.props.upcoming }),
          this.setState({ duetasks: this.props.due })
        );
      }, 100);
    });
  }

  // taskItems() {
  //   return this.state.taskItems.map((item) => {
  //     return <TaskItem key={item.specs_sn} item={item} />;
  //   });
  // }

  render() {
    return (
      <div>
        <OverdueBar odtasks={this.state.odtasks} />
        <DueBar duetasks={this.state.duetasks} />
        <UpcomingBar uptasks={this.state.uptasks} />
      </div>
    );
  }
}
