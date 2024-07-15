import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/task-styles.scss";

const TaskList = (props) => {
  const tasks = props.tasks;
  const items = _.map(tasks, (item) => {
    return item;
  });
  const taskList = items.map((taskItem) => {
    return (
      <div key={taskItem.id} className="task-item-container">
        <div className="text-content">
          <div key={taskItem.id} className="task-card">
            <h1 className="task">Task<br></br>{taskItem.job}</h1>
            <h1 className="date">Next Due<br></br>{taskItem.nextdue}</h1>
            <button className="complete">Complete</button>

            <button onClick={showHideHelp} className="help-button">
              Help
              <div id="help" className="content ">
                <img src={taskItem.instructions} />
              </div>
            </button>
          </div>
        </div>
        <div className="actions"></div>
      </div>
    );
  });

  return <div className="Task-list-wrapper">{taskList}</div>;
};

export default TaskList;
function showHideHelp() {
  const help = document.getElementById("help");
  help.classList.toggle("show");
}
