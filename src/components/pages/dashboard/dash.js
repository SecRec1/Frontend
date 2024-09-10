import React, { Component } from "react";

import MachineHours from "./machinehours";
import Notes from "./notes";
import ToolNeeds from "./toolneeds";
import Parts from "./parts";
import Contractors from "./contractors";
import Jobs from "./jobsinwaiting";

import styles from "../../../style/dashboard.scss";

export default class Dash extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div className="dash-container">
          <div className="main-left">
            <div className="main-left-top">
              <div className="machine-hours">
                <MachineHours />
              </div>
            </div>
            <div className="main-left-bottom">
              <div className="notes">
                <Notes />
              </div>
            </div>
          </div>
          <div className="main-center">
            <div className="main-center-top">
              <div className="contractors">
                <Contractors />
              </div>
            </div>
            <div className="main-center-bottom">
              <div className="toolneeds">
                <ToolNeeds />
              </div>
            </div>
          </div>

          <div className="main-right">
            <div className="main-right-top">
              <div className="jobs-in-waiting">
                <Jobs />
              </div>
            </div>
            <div className="main-right-bottom">
              <div className="parts">
                <Parts />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
