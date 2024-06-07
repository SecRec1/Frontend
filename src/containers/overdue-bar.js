import React,{Component} from "react";

import styles from "../style/app.scss";
import TaskList from "../components/task-list";

export default class OverdueBar extends Component {
  render() {
    return (
      <div className="Overdue_container">
        <button onClick={showHideoverdue} className="Overdue button">
          Overdue Maint
        </button>
        <div id="Over" className="Overdue-content">
        <TaskList odtasks={this.props.odtasks} tasks={this.props.data2}
           />
        </div>
      </div>
    );
  }
}
function showHideoverdue() {
    var overdue = document.getElementById("Over");
    overdue.classList.toggle("show");
  }