import React from "react";
import { Link } from "react-router-dom";
import styles from "../style/task-styles.scss";

const TaskList = (props) => {
  const taskList = props.tasks.map((taskItem) => {
    return (
      <div key={taskItem.id} className="Specs-item-container">
        <div className="text-content">
          <div className="task-card">
            <h1>{taskItem.task}</h1>

            <button onClick={showHideHelp} className="help-button">
              Help
              <div id="help" className="content">
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
  var help = document.getElementById("help");
  help.classList.toggle("show");
}
