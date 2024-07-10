import React, { Component } from "react";
import NavigationComponent from "../navigation-container";
import SetTaskForm from "../forms/set-task-form";
import AddTask from "../forms/add-task";
export default class Scan extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="set-task-form">
          <h1>Set machine tasks by SN</h1>
          <SetTaskForm />
        </div>
        <div>
          <h1>Add New Task</h1>
          <AddTask />
        </div>
      </div>
    );
  }
}
