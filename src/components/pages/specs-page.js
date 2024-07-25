import React, { Component } from "react";
import axios from "axios";


import SpecsDetail from "../detail-page/specs-details";
import TaskCalculator from "../upcoming-tasks";

import styles from "../../style/specs-page.scss";

export default class SpecsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specsItem: {},
    };
    this.getSpecs = this.getSpecs.bind(this);
  }
 
  getSpecs() {
    axios
      .get(`http://127.0.0.1:5000/Specs/${this.props.match.params.sn}`)
      .then((response) => {
        this.setState({
          specsItem: response.data
        });
        
      });
  }
  
  
  
  componentDidMount() {
    this.getSpecs();
  }
  
  
  
  
  
  render() {
    return (
      <div className="wrapper">
        <div className="detail-wrapper">
          <SpecsDetail className="details" specsn={this.props.match.params.sn} />
        </div>
        <div className="task-wrapper">
          
          <TaskCalculator specsItem={this.state.specsItem} specsn={this.props.match.params.sn} />
        </div>
      </div>
    );
  }
}
