import React from "react";
import ReactModal from "react-modal";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/task-styles.scss";
import Icons from "../components/helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InstructionsModal from "./modals/instructions-modal";

const GenTaskList = (props) => {
  Icons();

  const tasks = props.tasks;
  const items = _.map(tasks, (item) => {
    return item;
  });
  const taskList = items.map((taskItem) => {
    return (
      <div key={taskItem.id} className="task-item-container">
        <div className="text-content">
          <h1 key={taskItem.id} className="task">
            {taskItem.job}
          </h1>
        </div>
        <div className="actions">
          <button
            onClick={props.handleOpenInstructionsModal}
            className="help-button button"
          >
            <FontAwesomeIcon className="action-icon" icon="file-lines" />
            <InstructionsModal
              taskModalIsOpen={props.taskModalIsOpen}
              image={taskItem.instructions}
              handleCloseInstructionsModal={props.handleCloseInstructionsModal}
            />
          </button>
          <button className="button"
          //onClick={this.handleEditClick}
          >
            <FontAwesomeIcon className="action-icon" icon="edit" />
          </button>
          <button className="button" onClick={() => props.handleDeleteClick(taskItem)}>
            <FontAwesomeIcon className="action-icon" icon="trash" />
          </button>
        </div>
      </div>
    );
  });

  return <div className="Task-list-wrapper">{taskList}</div>;
};

export default GenTaskList;
function showHideHelp() {
  const help = document.getElementById("help");
  help.classList.toggle("show");
}
