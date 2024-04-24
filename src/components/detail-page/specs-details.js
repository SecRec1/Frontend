import React, { Component } from "react";
import axios from "axios";

export default class SpecsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSN: this.props.match.params.slug,
      SpecsItem: {},
      editMode: false,
    };
  }
  getSpecsItem() {
    axios
      .get(`http://127.0.0.1:5000/Specs/${this.state.currentSN}`)
      .then((response) => {
        this.setState({
          SpecsItem: response.data.Specs,
        });
      })
      .catch((error) => {
        console.log("getSpecsItem error", error);
      });
  }
  ComponentDidMount() {
    this.getSpecsItem();
  }

  render() {
    const {
      QRCode,
      SN,
      Name,
      Designator,
      Subdesignator,
      Oil,
      Coolant,
      Department,
      Motor,
    } = this.state.SpecsItem;
    return (
      <div>
        <img src={QRCode}/>
        <h1>{Name}{SN}</h1>
      </div>
    );
  }
}
