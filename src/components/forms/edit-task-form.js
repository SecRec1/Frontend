import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class EditTaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      job: "",
      instructions: "",
      editMode: false,
      apiUrl: `127.0.0.1:5000/Task/${id}`,
      apiAction: "patch",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleInstructionsDrop = this.handleInstructionsDrop.bind(this);
    this.instructionsRef = React.createRef();
  }
  componentDidUpdate() {
    if (Object.keys(this.props.tasksToEdit).length > 0) {
      const { id, job, instructions } = this.props.tasksToEdit;

      this.props.clearTasksToEdit();
      this.setState({
        id: id,
        job: job,
        instructions: instructions || "",
        editMode: true,
      });
    }
  }

  handleInstructionsDrop() {
    return {
      addedfile: (file) => this.setState({ instructions: file }),
    };
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

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    
    if (this.state.instructions) {
      formData.append("instructions", this.state.instructions.dataURL);
    }

    const data = Object.fromEntries(formData);

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        this.props.handleNewTaskSubmission(response);
        this.setState({
          id: "",
          sn: "",
          name: "",
          instructions: "",
          designator: "",
          subdesignator: "",
          oil: "",
          coolant: "",
          department: "",
          motor: "",
          hours: "",
          editMode: "False",
        });
        [ this.instructionsRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Searchbar">
          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="sn"
            placeholder="Equipment sn"
            value={this.state.sn}
            onChange={this.handleChange}
          />

          <DropzoneComponent
            ref={this.InstructionsRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleInstructionsDrop()}
          >
            <div className="dz-message">Instructions</div>
          </DropzoneComponent>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
