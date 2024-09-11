import React, { Component } from "react";
import axios from "axios";

import PartsToOrder from "./partstoorder";
import PartsOrdered from "./partsordered";

import styles from "../../../style/dashboard.scss";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts: [],
      partstoorder: [],
      partsordered: [],
    };
    this.getParts = this.getParts.bind(this);
    this.handleToOrderFilter = this.handleToOrderFilter.bind(this);
    this.handleOrderedFilter = this.handleOrderedFilter.bind(this);
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getParts();
  }

  getParts() {
    axios
      .get("http://192.168.1.231:8000/Parts")
      .then((res) => {
        this.setState({ parts: res.data }, () => {
          // Call the filter functions after the state has been updated
          this.handleToOrderFilter();
          this.handleOrderedFilter();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  handleToOrderFilter(e) {
    let partstoorder = this.state.parts.filter((part) => part.ordered === "no");
    this.setState({ partstoorder });
  }

  handleOrderedFilter(e) {
    let partsordered = this.state.parts.filter((part) => part.ordered === "yes");
    this.setState({ partsordered });
  }

  render() {
    return (
      <div className="parts-container">
        {/* Top half - PartsToOrder */}
        <div className="parts-to-order">
          <PartsToOrder parts={this.state.partstoorder} />
        </div>
  
        {/* Bottom half - PartsOrdered */}
        <div className="parts-ordered">
          <PartsOrdered parts={this.state.partsordered} />
        </div>
      </div>
    );
  }
}
