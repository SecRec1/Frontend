import React, { Component } from "react";
import axios from "axios";

import styles from "../../../style/dashboard.scss";

export default class PartsOrdered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsOrdered: [],
    };

    this.handleArrived = this.handleArrived.bind(this);
  }

  componentDidMount() {
    // Fetch the parts data from the backend
    axios
      .get("https://mainttracker-back-b77a8e4583e3.herokuapp.com//Parts")
      .then((response) => {
        // Filter parts where ordered is "Yes"
        const orderedParts = response.data.filter(
          (part) => part.ordered === "Yes"
        );
        this.setState({ partsOrdered: orderedParts });
      })
      .catch((error) => {
        console.error("Error fetching parts:", error);
      });
  }

  handleArrived(partId) {
    // Send DELETE request to the backend to delete the part by ID
    axios
      .delete(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Parts/${partId}`)
      .then((response) => {
        // Update state to remove the part from the UI
        this.setState((prevState) => ({
          partsOrdered: prevState.partsOrdered.filter((part) => part.id !== partId),
        }));
      })
      .catch((error) => {
        console.error("Error deleting part:", error);
      });
  }

  render() {
    return (
      <div>
        <div className="parts-header-two">
          <h1>Parts Ordered</h1>
        </div>

        {/* Table to display ordered parts */}
        <div className="part-container-two">
          <table>
            <thead>
              <tr>
                <th>Part</th>
                <th>Count</th>
                <th>ETA</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.partsOrdered.map((part) => (
                <tr key={part.id}>
                  <td>{part.part}</td>
                  <td>{part.quantity}</td>
                  <td>{part.eta}</td>
                  <td>
                    <button onClick={() => this.handleArrived(part.id)}>Arrived</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
