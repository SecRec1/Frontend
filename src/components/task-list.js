import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/task-styles.scss";

export default class TaskList extends Component {
  constructor(props) {
    super(props);

    
  }
  
  
  showHideHelp() {
    var help = document.getElementById("help");
    help.classList.toggle("show");
  }
  render() {
    return (
      <div>
        <div key="key" className="Specs-item-container">
          <div className="text-content">
            <div className="task-card">
              <h1>task</h1>

              <button onClick={this.showHideHelp} className="help-button">
                Help
                <div id="help" className="content">
                  <img src="instructions" />
                </div>
              </button>
            </div>
          </div>
          <div className="actions"></div>
        </div>
      </div>
    );
  }
}

// const TaskList = (props) => {
//   const taskList = props.tasks.map((taskItem) => {
//     console.log();
//     return (
//       <div key={taskItem.id} className="Specs-item-container">
//         <div className="text-content">
//           <div className="task-card">
//             <h1>{taskItem.task}</h1>

//             <button onClick={showHideHelp} className="help-button">
//               Help
//               <div id="help" className="content">
//                 <img src={taskItem.instructions} />
//               </div>
//             </button>
//           </div>
//         </div>
//         <div className="actions"></div>
//       </div>
//     );
//   });

//   return <div className="Task-list-wrapper">{taskList}</div>;
//}

// export default TaskList;
