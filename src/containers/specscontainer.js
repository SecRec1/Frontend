import React, { Component } from "react";
import SpecsForm from "../components/specsform";
import Styles from "../style/app.scss";


export default class SpecsContainer extends Component {
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


  render() {
    return (
      <div className="Specs_container">
        <button onClick={showHideequip} className="Equipment button">
          Equipment Specs
        </button>
        <div id="Specs" className="Equipment-content">
          <SpecsForm/>
        </div>
      </div>
    );
  }
}

  function showHideequip() {
    var specs = document.getElementById("Specs");
    specs.classList.toggle("show");
  }
