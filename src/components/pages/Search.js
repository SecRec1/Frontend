import React, { Component } from "react";
import axios from "axios";

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SN: "",
      Name: "",
      QRCode: "",
      Designator: "",
      Subdesignator: "",
      Oil: "",
      Coolant: "",
      Department: "",
      Motor: "",
      apiUrl: "http://127.0.0.1:5000/",
      apiAction: "post",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.MotorRef = React.createRef();
    this.QRCodeRef = React.createRef();
  }
  buildForm() {
    let formData = new FormData();
    formData.append("Specs[QRCode]", this.state.QRCode);
    formData.append("Specs[SN]", this.state.SN);
    formData.append("Specs[Name]", this.state.Name);
    formData.append("Specs[Designator]", this.state.Designator);
    formData.append("Specs[Subdesignator]", this.state.Subdesignator);
    formData.append("Specs[Oil]", this.state.Oil);
    formData.append("Specs[Coolant]", this.state.Coolant);
    formData.append("Specs[Department]", this.state.Department);
    formData.append("Specs[Motor]", this.state.Motor);

    if (this.state.QRCode) {
      formData.append("Specs[QRCode]", this.state.QRCode);
    }

    if (this.state.Motor) {
      formData.append("Specs[Motor]", this.state.Motor);
    }

    return formData;
  }
}
