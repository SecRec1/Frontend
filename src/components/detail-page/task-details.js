import React, { Component } from "react";
import axios from "axios";

export default class TaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskItem: {},
    };
    this.getTaskItem = this.getTaskItem.bind(this);
  }
  getTaskItem() {
    axios
      .get(`http://127.0.0.1:5000/Task/${this.props.taskid}`)

      .then((response) => {
        console.log(response.data);
        this.setState({ taskItem: response.data });
      })
      .catch((error) => console.log("detail page getSpec error", error));
  }

  taskItem() {
    return this.state.data2.map((item) => {
      return <TaskItem key={item.sn} item={item} />;
    });
  }
  render() {
    return (
      <div>
        <div>
          <h1>{this.props.job}task</h1>
        </div>
        <div>
          <h2>{this.props.lastcompleted}last</h2>
        </div>
        <div>
          <h2>{this.props.nextdue}next</h2>
        </div>
        {/* <Link to="/TaskInfo">instructions</Link> */}
      </div>
    );
  }
}
