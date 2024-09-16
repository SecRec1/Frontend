import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../../../style/dashboard.scss";

export default class ToolNeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolneeds: [],
      showModal: false, // Track modal visibility
      newTool: "",
      newSize: "",
      newCount: "",
    };

    this.getToolNeeds = this.getToolNeeds.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this); // Bind handleDelete function
  }

  componentDidMount() {
    this.getToolNeeds();
  }

  getToolNeeds() {
    axios.get("https://backend-1-jevl.onrender.com/ToolNeeds").then((response) => {
      this.setState({ toolneeds: response.data });
    });
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Post the new tool need to the backend
    axios
      .post("https://backend-1-jevl.onrender.com/ToolNeeds", {
        tool: this.state.newTool,
        size: this.state.newSize,
        count: this.state.newCount,
      })
      .then((response) => {
        // Update the toolneeds list
        this.setState((prevState) => ({
          toolneeds: [...prevState.toolneeds, response.data],
          showModal: false, // Close modal after adding
          newTool: "",
          newSize: "",
          newCount: "",
        }));
      })
      .catch((error) => {
        console.error("Error adding tool need:", error);
      });
  }

  handleDelete(toolneedId) {
    // Send DELETE request to backend
    axios
      .delete(`https://backend-1-jevl.onrender.com/ToolNeeds/${toolneedId}`)
      .then(() => {
        // Remove the deleted toolneed from the state
        this.setState((prevState) => ({
          toolneeds: prevState.toolneeds.filter(
            (toolneed) => toolneed.id !== toolneedId
          ),
        }));
      })
      .catch((error) => {
        console.error("Error deleting tool need:", error);
      });
  }

  render() {
    return (
      <div>
        <div className="tool-header">
          <h1>Tool Needs</h1>
          <button onClick={this.toggleModal}>+</button>
        </div>

        {/* Tool Needs Table */}
        <div className="tool-container">
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>Size</th>
                <th>Count</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.toolneeds.map((toolneed) => (
                <tr key={toolneed.id}>
                  <td>{toolneed.tool}</td>
                  <td>{toolneed.size}</td>
                  <td>{toolneed.count}</td>
                  <td>
                    <button onClick={() => this.handleDelete(toolneed.id)}>
                      <FontAwesomeIcon icon="fa-solid fa-check" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Tool Need</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Tool:
                  <input
                    type="text"
                    name="newTool"
                    value={this.state.newTool}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Size:
                  <input
                    type="text"
                    name="newSize"
                    value={this.state.newSize}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <br />
                <label>
                  Count:
                  <input
                    type="number"
                    name="newCount"
                    value={this.state.newCount}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <br />
                <button type="submit">Add Tool Need</button>
                <button type="button" onClick={this.toggleModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
