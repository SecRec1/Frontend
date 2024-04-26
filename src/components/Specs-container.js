import React, { Component } from "react";


export default class SpecsContainer extends Component {
  constructor() {
    super();

    this.state = {
      sn: "",
      Name: "",
      QRCode: "",
      Designator: "",
      Subdesignator: "",
      Oil: "",
      Coolant: "",
      Department: "",
      Motor: "",
      apiUrl: "http://127.0.0.1:5000/Specs",
      apiAction: "get",
    };
  }
  // getMachineSpecs(){
  //   axios.get("http://127.0.0.1:5000/Specs");
  // }
  // componentDidMount(){
  //   this.getMachineSpecs();
  // }
  render() {
    return <div> specs here
        
    </div>;
  }
}
