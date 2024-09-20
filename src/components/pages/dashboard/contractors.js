import React, { Component } from "react";
import axios from "axios";
import styles from "../../../style/dashboard.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contractors: [],
      onsitetoday: "",
      showModal: false, // State to control modal visibility
      newContractor: {
        company: "",
        indoor: "",
        onsitestart: "",
        onsiteend: "",
      },
    };

    this.getContractors = this.getContractors.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteContractor = this.deleteContractor.bind(this);
  }

  componentDidMount() {
    this.getContractors();
  }

  getContractors() {
    axios
      .get("https://mainttracker-back-b77a8e4583e3.herokuapp.com//Contractors")
      .then((response) => {
        this.setState({ contractors: response.data });
      })
      .catch((error) => {
        console.error("Error fetching contractors:", error);
      });
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  handleInputChange(e) {
    const { name, value } = e.target;
    this.setState({
      newContractor: {
        ...this.state.newContractor,
        [name]: value,
      },
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://mainttracker-back-b77a8e4583e3.herokuapp.com//Contractors", this.state.newContractor)
      .then((response) => {
        this.setState({
          contractors: [...this.state.contractors, response.data],
          showModal: false, // Close modal on success
          newContractor: { company: "", indoor: "", onsitestart: "", onsiteend: "" }, // Reset form
        });
      })
      .catch((error) => {
        console.error("Error adding contractor:", error);
      });
  }
  deleteContractor(id) {
    // Make a DELETE request to the server to delete the contractor
    axios
      .delete(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Contractors/${id}`)
      .then(() => {
        // Update the state to remove the contractor without reloading the page
        this.setState({
          contractors: this.state.contractors.filter((contractor) => contractor.id !== id),
        });
      })
      .catch((error) => {
        console.error("Error deleting contractor:", error);
      });
  }

  render() {
    return (
      <div>
        <div className="contractor-header">
          <h1>Contractors</h1>
          <button onClick={this.toggleModal}>+</button>
        </div>

        <div className="contractor-container">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Indoor</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Onsite Today</th>
              </tr>
            </thead>
            <tbody>
              {this.state.contractors.map((contractor) => (
                <tr key={contractor.id}>
                  <td>{contractor.company}</td>
                  <td>{contractor.indoor}</td>
                  <td>{contractor.onsitestart}</td>
                  <td>{contractor.onsiteend}</td>
                  <td>{this.state.onsitetoday}</td>
                  <td>
                    <button onClick={() => this.deleteContractor(contractor.id)}>-</button>
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
              <h2>Add Contractor</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Company:
                  <input
                    type="text"
                    name="company"
                    value={this.state.newContractor.company}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <label>
                  Indoor:
                  <input
                    type="text"
                    name="indoor"
                    value={this.state.newContractor.indoor}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <label>
                  Start Date:
                  <input
                    type="date"
                    name="onsitestart"
                    value={this.state.newContractor.onsitestart}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <label>
                  End Date:
                  <input
                    type="date"
                    name="onsiteend"
                    value={this.state.newContractor.onsiteend}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <button type="submit">Add Contractor</button>
              </form>
              <button onClick={this.toggleModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
