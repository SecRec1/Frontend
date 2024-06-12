import React,{Component} from "react";

import styles from "../style/app.scss";
import TaskList from "../components/task-list";

export default class OverdueBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      odtasks: [],
    };
  }

  taskItems(props) {
    
    return props.odtasks.map((item) => {
      return <TaskItem key={item.sn} item={item} />;
    });
  }
  

  render() {
    return (
      <div className="Overdue_container">
        <button onClick={showHideoverdue} className="Overdue button">
          Overdue Maint
        </button>
        <div id="Over" className="Overdue-content">
        {this.taskItems()}
        </div>
      </div>
    );
  }
}
function showHideoverdue() {
    var overdue = document.getElementById("Over");
    overdue.classList.toggle("show");
  }