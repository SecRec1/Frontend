import React, { Component } from "react";
import axios from "axios";

export default class ToolNeeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolneeds: [],
    };
    this.getToolNeeds = this.getToolNeeds.bind(this);
  }

  componentDidMount() {
    this.getToolNeeds();
  }

  getToolNeeds() {
    axios.get("http://192.168.1.231:8000/ToolNeeds").then((response) => {
      this.setState({ toolneeds: response.data });
    });
  }
  render() {
    return (
      <div>
        <h1>Tool Needs</h1>
        {this.state.toolneeds.map((toolneed) => (
          <div key={toolneed.id}>
            <h2>{toolneed.tool}</h2>
            <h2>{toolneed.size}</h2>
            <h2>{toolneed.count}</h2>
          </div>
        ))}
      </div>
    );
  }
}
