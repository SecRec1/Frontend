import React, { Component } from "react";
import axios from "axios";

import TaskManager from "../task-container";
import SpecsItem from "../specs-item";

export default class SpecsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      specsItem: {},
    };
    this.getSpecsItem = this.getSpecsItem.bind(this);
  }

  componentDidMount() {
    this.getSpecsItem();
  }

  getSpecsItem() {
    axios
      .get(`http://127.0.0.1:5000/Specs/${this.props.specsn}`)

      .then((response) => {
        this.setState({ specsItem: response.data });
      })
      .catch((error) => console.log("detail page getSpec error", error));
  }

  specsItem() {
    return this.state.specsItem.map((item) => {
      return <SpecsItem key={item.sn} item={item} />;
    });
  }

  render() {
    return (
      <div>
        <div>
          <div className="item-card">
            <div className="leftside">
              <img className="qrcode" src={this.state.specsItem.qrcode} />
            </div>
            <div className="rightside">
              <div className="top">
                <div className="left">
                  <h4 className="serialnumber ">{this.state.specsItem.sn}</h4>
                  <h4 className="name">{this.state.specsItem.name}</h4>
                  <h4 className="designator">
                    {this.state.specsItem.designator}
                  </h4>
                  <h4 className="subdesignator">
                    {this.state.specsItem.subdesignator}
                  </h4>
                </div>
                <div className="right">
                  <h4 className="department">
                    {this.state.specsItem.department}
                  </h4>
                  <h4 className="oil">{this.state.specsItem.oil}</h4>
                  <h4 className="coolant">{this.state.specsItem.coolant}</h4>
                </div>
              </div>
              <div className="bottom">
                <img className="motor plate" src={this.state.specsItem.motor} />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}
