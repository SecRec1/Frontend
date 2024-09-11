import React, { Component } from "react";
import axios from "axios";

import styles from "../../../style/dashboard.scss";

export default class PartsOrdered extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsOrdered: [],
    };
  }

  componentDidMount() {
    // Fetch the parts data from the backend
    axios
      .get("http://192.168.1.231:8000/Parts")
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
              </tr>
            </thead>
            <tbody>
              {this.state.partsOrdered.map((part) => (
                <tr key={part.id}>
                  <td>{part.part}</td>
                  <td>{part.quantity}</td>
                  <td>{part.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
