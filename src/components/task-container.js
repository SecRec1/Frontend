import React, { Component } from "react";
import axios from "axios";

import DueBar from "../containers/due-bar";
import UpcomingBar from "../containers/upcoming-bar";
import OverdueBar from "../containers/overdue-bar";

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskItems: [],
    };
    this.getTaskItems = this.getTaskItems.bind(this);
  }
componentDidMount() {
  this.getTaskItems();
}
  getTaskItems() {
    axios
     .get(`http://127.0.0.1:5000/Task`)
     .then((response) => {
        this.setState({
          taskItems: [...response.data],
        });
        
      })
     .catch((error) => {
        console.log(error);
      });
  }
  
  taskItems() {
    return this.state.taskItems.map((item) => {
      return <TaskItem key={item.sn} item={item} />;
    });
  }

  
  render() {
    return (
      <div>
        <OverdueBar data2={this.state.taskItems} />
        <DueBar data2={this.state.taskItems} />
        <UpcomingBar data2={this.state.taskItems} 
        specsn={this.props.specsn} />
        
      </div>
    );
  }
}
