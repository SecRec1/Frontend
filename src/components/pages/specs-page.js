import React, { Component } from "react";
import axios from "axios";

import TaskManager from "../task-container";
import SpecsDetail from "../detail-page/specs-details";

import styles from "../../style/specs-page.scss";

export default class SpecsPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wrapper">
        <div className="detail-wrapper">
          <SpecsDetail className="details" specsn={this.props.match.params.sn} />
        </div>
        <div className="task-wrapper">
          <TaskManager specsn={this.props.match.params.sn}/>
        </div>
      </div>
    );
  }
}
