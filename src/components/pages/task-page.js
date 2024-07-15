import React, { Component } from "react";


import TaskDetails from "../detail-page/task-details";

export default class TaskPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <div className="taskList">
          <TaskDetails/>
        </div>
       
      </div>
    );
  }
}