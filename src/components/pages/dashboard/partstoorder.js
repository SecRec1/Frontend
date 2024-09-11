import React, { Component } from "react";
import axios from "axios";

import styles from "../../../style/dashboard.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showOrderModal: false, // New modal for ordered items
      selectedPart: null,
      eta: "",
      newPart: "",
      newCount: "",
      ordered: "no",
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOrderModal = this.toggleOrderModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrdered = this.handleOrdered.bind(this);
    this.handleOrderSubmit = this.handleOrderSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this); // Bind handleDelete
  }

  toggleModal() {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  }

  toggleOrderModal() {
    this.setState((prevState) => ({ showOrderModal: !prevState.showOrderModal }));
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newPartEntry = {
      part: this.state.newPart,
      quantity: this.state.newCount,
      ordered: this.state.ordered,
      eta: this.state.eta,
    };

    axios
      .post("http://192.168.1.231:8000/Parts", newPartEntry)
      .then(() => {
        this.setState({
          showModal: false,
          newPart: "",
          newCount: "",
        });
      })
      .catch((error) => {
        console.error("Error adding part:", error);
      });
      window.location.reload();
  }

  handleOrdered(part) {
    // Set the selected part in state and open the order modal
    this.setState({ selectedPart: part, showOrderModal: true });
  }

  handleOrderSubmit(event) {
    event.preventDefault();
    const updatedPart = {
      ...this.state.selectedPart,
      ordered: "Yes",
      eta: this.state.eta,
    };

    // Perform PUT request to update the part
    axios
      .put(`http://192.168.1.231:8000/Parts/${updatedPart.id}`, updatedPart)
      .then(() => {
        this.setState({
          showOrderModal: false,
          eta: "",
        });
      })
      .catch((error) => {
        console.error("Error updating part:", error);
      });
      window.location.reload();
  }

  handleDelete(partId) {
    // Send DELETE request to the backend to delete the part
    axios
      .delete(`http://192.168.1.231:8000/Parts/${partId}`)
      .then(() => {
        // After successful deletion, refresh the page or update state
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting part:", error);
      });
  }

  render() {
    return (
      <div>
        <div className="parts-header-one">
          <h1>Parts to Order</h1>
          <button onClick={this.toggleModal}>+</button>
        </div>

        {/* Table displaying parts */}
        <div className="part-container-one">
          <table>
            <thead>
              <tr>
                <th>Part</th>
                <th>Count</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.parts.map((part) => (
                <tr key={part.id}>
                  <td>{part.part}</td>
                  <td>{part.quantity}</td>
                  <td>
                    <button onClick={() => this.handleOrdered(part)}>Ordered</button>
                    <button onClick={() => this.handleDelete(part.id)}>Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for adding a new part */}
        {this.state.showModal && (
          <div className="modal">
            <div className="modal-content">
              <h2>Add Part to Order</h2>
              <form onSubmit={this.handleSubmit}>
                <label>
                  Part:
                  <input
                    type="text"
                    name="newPart"
                    value={this.state.newPart}
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
                <button type="submit">Add Part</button>
                <button type="button" onClick={this.toggleModal}>Close</button>
              </form>
            </div>
          </div>
        )}

        {/* Modal for ordering a part */}
        {this.state.showOrderModal && this.state.selectedPart && (
          <div className="modal">
            <div className="modal-content">
              <h2>Order Part</h2>
              <p>Part: {this.state.selectedPart.part}</p>
              <p>Count: {this.state.selectedPart.quantity}</p>
              <form onSubmit={this.handleOrderSubmit}>
                <label>
                  ETA:
                  <input
                    type="date"
                    name="eta"
                    value={this.state.eta}
                    onChange={this.handleInputChange}
                    required
                  />
                </label>
                <br />
                <button type="submit">Update Part</button>
                <button type="button" onClick={this.toggleOrderModal}>Close</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
