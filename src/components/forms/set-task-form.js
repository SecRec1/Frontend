import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { DateTime } from "luxon";
import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import TaskOptions from "../task-selections/checkbox-list";

export default class SetTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sn: "",
      tasks: [],
      taskid: [],
      duration: "",
      startedat: "",
      instructions: "",
      hdselector: "",
      lastcompleted: "",
      nextdue: "",
      editMode: "False",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    this.getTasks = this.getTasks.bind(this);
    this.setLastCompleted = this.setLastCompleted.bind(this);
    this.setNextdue = this.setNextdue.bind(this);
    
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    
  }

  getTasks() {
    axios.get("http://127.0.0.1:5000/Task").then((response) => {
      this.setState({ tasks: response.data });
    });
  }
  

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
  }

  setLastCompleted() {
    const hdselector = this.state.hdselector;
    const startedat = this.state.startedat;
    if (hdselector === "days") {
      this.setState({
        lastcompleted: DateTime.fromFormat(startedat, "MM/dd/yyyy").toISODate(),
      });
    } else {
      this.setState({ lastcompleted: startedat });
    }
  }

  setNextdue() {
    const hdselector = this.state.hdselector;
    const duration = parseInt(this.state.duration);

    const nextduedate = DateTime.local(lastcompleted)
      .plus({ days: duration })
      .toISODate();
    const lastcompleted = this.state.lastcompleted;
    if (hdselector === "hours") {
      this.setState({ nextdue: lastcompleted + duration });
    } else {
      this.setState({ nextdue: nextduedate });
    }
  }
  handleNewFormSubmission() {}

  handleSubmit(event) {
    event.preventDefault();
    this.setLastCompleted();
    this.setNextdue();
    const data = [
      {
        specs_sn: this.state.sn,
        task_id: this.state.taskid,
        lastcompleted: this.state.lastcompleted,
        nextdue: this.state.nextdue,
      },
    ];

    axios
      .post(`http://127.0.0.1:5000/IBST`, data)
      .then(
        this.setState({
          sn: "",
          taskid: "",
          lastcompleted: "",
          nextdue: "",
          duration: "",
          startedat: "",
          hdselector: "",
        })
      )

      .catch((error) => {
        console.log("error", error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {
    this.getTasks();
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Searchbar">
          <input
            type="text"
            name="sn"
            placeholder="Equipment SN"
            value={this.state.sn}
            onChange={this.handleChange}
          />

          <select
            type="text"
            name="taskid"
            placeholder="Select Tasks"
            onChange={this.handleChange}
            value={this.state.taskid}
          >
            <option>Select Task</option>
            <TaskOptions key={this.state.taskid} items={this.state.tasks} />
          </select>

          <input
            type="date"
            name="startedat"
            placeholder="Started at?"
            value={this.state.startedat}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={this.state.duration}
            onChange={this.handleChange}
          />
          <select
            type="text"
            name="hdselector"
            placeholder="Pick one"
            value={this.state.hdselector}
            onChange={this.handleChange}
          >
            <option value="pick">H or D</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
        

        <button type="submit">Save</button>
      </form>
    );
  }
}
