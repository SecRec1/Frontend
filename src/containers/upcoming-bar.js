import React, { Component } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Styles from "../style/app.scss";

import TaskList from "../components/task-list";

export default class UpcomingBar extends Component {
  constructor(props) {
    super(props);
    

    
  }
  // taskItems() {
  //   return this.props.uptasks.map((item) => {
  //     return <TaskItem key={item.sn} item={item} />;
  //   });
  // }
  

 

  render() {
    return (
      <div className="Upcoming_container">
        <button onClick={showHideupcoming} className="Upcoming button">
          Upcoming Maint within 30 days
        </button>
        <div id="Up" className="Upcoming-content">
          {/* {this.taskItems()} */}
          

          {/* <Link to="/TaskInfo">instructions</Link> */}
        </div>
      </div>
    );
  }
}
function showHideupcoming() {
  var upcoming = document.getElementById("Up");
  upcoming.classList.toggle("show");
}
