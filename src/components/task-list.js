import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../style/task-styles.scss";



// export default class TaskList extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const tasks = this.props.tasks;
//     // console.log(tasks);
//     return (
//       <div>
//         <div key="key" className="Task-item-container">
//           <div className="text-content">
//             <div className="task-card">
//               <h1>{tasks.task}</h1>

//               <button onClick={this.showHideHelp} className="help-button">
//                 Help
//                 <div id="help" className="content">
//                   <img src={tasks.instructions} />
//                 </div>
//               </button>
//             </div>
//           </div>
//           <div className="actions"></div>
//         </div>
//       </div>
//     );
//   }
// }    
   

// const TaskList = (props) => {
  
//   const tasks = [props.tasks.json];
//   console.log("tasks",tasks);
//   const taskList = tasks.map((item) => {
    
//     return (
//       <div  className="task-item-container">
//         <div className="text-content">
//           <div className="task-card" key={item.id}>
//             <h1>{item.task}</h1>

//             <button onClick={showHideHelp} className="help-button">
//               Help
//               <div id="help" className="content">
//                 <img src={item.instructions} />
//               </div>
//             </button>
//           </div>
//         </div>
//         <div className="actions"></div>
//       </div>
//     );
//   });

//   return <div className="Task-list-wrapper">{taskList}</div>;
// }

// export default TaskList;
// function showHideHelp(){
//     var help = document.getElementById("help");
//     help.classList.toggle("show");
//   }; 