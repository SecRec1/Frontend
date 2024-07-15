import React, { Component } from "react";
import axios from "axios";

import TaskManager from "../task-container";
import SpecsItem from "../specs-item";

import Styles from "../../style/specs-page.scss";
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
                <h6 className="serialnumber item">
                  Serial Number<br></br>
                  {this.state.specsItem.sn}
                </h6>

                <h6 className="designator item">
                  Make/Model<br></br>
                  {this.state.specsItem.designator}
                </h6>
                <h6 className="name item">
                  Machine Type<br></br>
                  {this.state.specsItem.name}
                </h6>
                <h6 className="subdesignator item">
                  Machine Sub-Type<br></br>
                  {this.state.specsItem.subdesignator}
                </h6>
              </div>
              <div className="right">
                <h6 className="department item">
                  Department<br></br>
                  {this.state.specsItem.department}
                </h6>
                <h6 className="oil item">
                  Oil Type<br></br>
                  {this.state.specsItem.oil}
                </h6>
                <h6 className="coolant item">
                  Coolant Type<br></br>
                  {this.state.specsItem.coolant}
                </h6>
                <h6 className="hours item">
                  Machine Hours:<br></br>{this.state.specsItem.hours}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="action-icon">
            <SpecsEditor specsItem={this.state.specsItem} />
          </a>
        </div>
      </div>
    );
  }
}
