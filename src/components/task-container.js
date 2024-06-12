import React, { Component } from "react";
import axios from "axios";

import DueBar from "../containers/due-bar";
import UpcomingBar from "../containers/upcoming-bar";
import OverdueBar from "../containers/overdue-bar";

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    
    
    
  }
  

  

  // taskItems() {
  //   return this.state.taskItems.map((item) => {
  //     return <TaskItem key={item.specs_sn} item={item} />;
  //   });
  // }

  render() {
    return (
      <div>
        <OverdueBar odtasks={this.props.overdue} />
        <DueBar duetasks={this.props.due} />
        <UpcomingBar uptasks={this.props.upcoming} />
      </div>
    );
  }
}
