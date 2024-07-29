import React, { Component } from "react";
import SpecsManager from "./specs-manager";
import TaskManager from "../task-manager";



import Styles from "../../style/manager.scss";
export default class Manager extends Component {
  render() {
    return (
      <div className="manager-container">
        <div className="button-manager">
          <button onClick={showHideSpecs}>SpecsManager</button>
          <button onClick={showHideTasks}>TaskManager</button>
        </div>

        <div className="form-manager">
          <div id="specs" className="specs">
            <SpecsManager />
          </div>
          <div id="tasks" className="tasks ">
            <TaskManager />
          </div>
        </div>
      </div>
    );
  }
}
function showHideTasks() {
  var tasks = document.getElementById("tasks");
  var specs = document.getElementById("specs");
  if (specs.classList.contains("show")) {
    specs.classList.remove("show");
  }
  tasks.classList.toggle("show");
}

function showHideSpecs() {
  var specs = document.getElementById("specs");
  var tasks = document.getElementById("tasks");
  if (tasks.classList.contains("show")) {
    tasks.classList.remove("show");
  }
  specs.classList.toggle("show");
}
function showHideBoth() {
  var specs = document.getElementById("specs");
  var tasks = document.getElementById("tasks");
  if (tasks.classList.contains("show")) {
    tasks.classList.remove("show");
  }
  if (specs.classList.contains("show")) {
    specs.classList.toggle("show");
  }
}
