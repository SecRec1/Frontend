import React, { Component } from "react";
import axios from "axios";

import TaskManager from "../task-container";
import SpecsItem from "../specs-item";

import Styles from "../../style/record-list.scss";
import SpecsEditor from "../spec-editor";



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
      <div key={this.state.specsItem.sn} className="Specs-item-container">
        <div className="text-content">
          <div className="item-card">
            <div className="leftside">
              <div className="top">
                <img className="qrcode" src={this.state.specsItem.qrcode} />
              </div>

              <div className="bottom">
                <img className="motor plate" src={this.state.specsItem.motor} />
              </div>
            </div>

            <div className="rightside">
              <div className="left">
                <h4 className="serialnumber item">{this.state.specsItem.sn}</h4>
                <h4 className="name item">{this.state.specsItem.name}</h4>
                <h4 className="designator item">
                  {this.state.specsItem.designator}
                </h4>
                <h4 className="subdesignator item">
                  {this.state.specsItem.subdesignator}
                </h4>
              </div>
              <div className="right">
                <h4 className="department item">
                  {this.state.specsItem.department}
                </h4>
                <h4 className="oil item">{this.state.specsItem.oil}</h4>
                <h4 className="coolant item">{this.state.specsItem.coolant}</h4>
                <h4 className="hours item">
                  Machine Hours:{this.state.specsItem.hours}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="action-icon" >
            <SpecsEditor specsItem={this.state.specsItem} />
          </a>
        </div>
      </div>
    );
  }
}
