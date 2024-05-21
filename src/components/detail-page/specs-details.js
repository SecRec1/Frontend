import React, { Component } from "react";
import axios from "axios";

import SpecsItem from "../specs-item";

export default class SpecsDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      specsItems: {},
    };
    // this.getSpecsItem = this.getSpecsItem.bind(this);
    
  }

  

  
  
  render() {
    const {
      sn,
      name,
      designator,
      subdesignator,
      department,
      oil,
      coolant,
      qrcode,
      motor,
    } = this.state.specsItems;

    return (
      <div
        className="specs-detail-wrapper"
        data={this.state.specsItems.data}
      > </div>
    );
  }
}
