import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/task-styles.scss";

// const TaskList = (props) => {

//   const taskList = props.tasks.map((taskItem) => {
    
//       <div key={taskItem.id} className="task-item-container">
//         <div className="text-content">
//           <div className="task-card" >
//             <h1 className="task">{taskItem.task}</h1>

//             <button onClick={showHideHelp} className="help-button">
//               Help
//               <div id="help" className="help">
//                 <img src={taskItem.instructions} />
//               </div>
//             </button>
//           </div>
//         </div>
//         <div className="actions"></div>
//       </div>
    
//   });

//   return <div className="Task-list-wrapper">{taskList}</div>;
// };

// export default TaskList;
function showHideHelp() {
  var help = document.getElementById("help");
  help.classList.toggle("show");
}
