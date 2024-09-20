import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Styles from "../../../style/dashboard.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specs: [],
      ibsts: [],
    };
    this.getSpecs = this.getSpecs.bind(this);
  }

  getSpecs() {
    axios
      .get(`https://mainttracker-back-b77a8e4583e3.herokuapp.com//Specs`)
      .then((response) => this.setState({ specs: response.data }));
  }

  componentDidMount() {
    this.getSpecs();
  }

  render() {
    return (
      <div>
        <div className="machine-header">
          <h1>MACHINE HOURS</h1>
        </div>

        <div className="machine-container">
          <table>
            <thead>
              <tr>
                <th>Machine Designator</th>
                <th>Name</th>
                <th>Sub Designator</th>
                <th>Hours</th>
              </tr>
            </thead>
            <tbody>
              {this.state.specs.map((item) => (
                <tr key={item.id}>
                  <td>{item.designator}</td>
                  <td>{item.name}</td>
                  <td>
                    <NavLink to={`/Specs/${item.sn}`}>
                      {item.subdesignator}
                    </NavLink>
                  </td>
                  <td>{item.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
