import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import filepickerCss from "../../node_modules/react-dropzone-component/styles/filepicker.css";
import dropzoneCss from "../../node_modules/dropzone/dist/min/dropzone.min.css";

import RichTextEditor from "../forms/rich-text-editor";

export default class SpecsForm extends Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleMotorDrop = this.handleMotorDrop.bind(this);
    this.handleQRCodeDrop = this.handleQRCodeDrop.bind(this);

    this.deleteImage = this.deleteImage.bind(this);

    this.MotorRef = React.createRef();
    this.QRCodeRef = React.createRef();
  }

  deleteImage(imageType) {
    axios
      .delete(
        `http://127.0.0.1:5000/Specs/${this.state.id}?image_type=${imageType}`,
        { withCredentials: true }
      )
      .then((response) => {
        this.setState({
          [`${imageType}_url`]: "",
        });
      })
      .catch((error) => {
        console.log("deleteImage error", error);
      });
  }

  componentDidUpdate() {
    if (Object.keys(this.props.portfolioToEdit).length > 0) {
      const {
        SN,
        Name,
        QRCode,
        Designator,
        Subdesignator,
        Oil,
        Coolant,
        Department,
        Motor,
      } = this.props.portfolioToEdit;

      this.props.clearPortfolioToEdit();

      this.setState({
        SN: SN,
        Name: Name || "",
        QRCode: QRCode || "",
        Designator: Designator || "",
        Subdesignator: Subdesignator || "",
        editMode: true,
        apiUrl: `http://127.0.0.1:5000/Specs/${id}`,
        apiAction: "patch",
        Oil: Oil || "",
        Coolant: Coolant || "",
        Department: Department || "",
        Motor: Motor || "",
      });
    }
  }

  handleMotorDrop() {
    return {
      addedfile: (file) => this.setState({ Motor: file }),
    };
  }

  handleQRCodeDrop() {
    return {
      addedfile: (file) => this.setState({ QRCode: file }),
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post",
    };
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1,
    };
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: this.buildForm(),
      
    })
      .then((response) => {
        if (this.state.editMode) {
          this.props.handleEditFormSubmission();
        } else {
          this.props.handleNewFormSubmission(response.data.portfolio_item);
        }

        this.setState({
          SN: "",
          Name: "",
          Designation: "",
          Subdesignation: "",
          Oil: "",
          Coolant: "",
          Department: "",
          Motor: "",
          editMode: false,
          apiUrl: "http://127.0.0.1:5000/Specs",
          apiAction: "post",
        });

        [this.MotorRef, this.QRCodeRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("Specs handleSubmit error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="Specs-form-wrapper">
        <div className="">
          <input
            type="text"
            name="Name"
            placeholder="Equipment Name"
            value={this.state.Name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="SN"
            placeholder="Equipment SN"
            value={this.state.SN}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="Department"
            Placeholder="Department"
            Value={this.state.Department}
            onChange={this.handleChange}
          />
        </div>

        <div className="">
          <select
            name="Designator"
            value={this.state.Designator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="none">None</option>
            <option value="Shredder">Shredder</option>
            <option value="Ring Mill">Ring Mill</option>
            <option value="Optical Sorter">Optical Sorter</option>
            <option value="Eddy Current">Eddy Current</option>
          </select>

          <select
            name="Subdesignator"
            value={this.state.Subdesignator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="none">None</option>
            <option value="Infeed">Infeed</option>
            <option value="Discharge">Discharge</option>
            <option value="Crossbelt">Crossbelt</option>
            <option value="Vibratory Mover">Vibratory Mover</option>
          </select>
       

        <input
          type="text"
          name="Oil"
          placeholder="Oil"
          value={this.state.Oil}
          onChange={this.handleChange}
        />

        
          <input
            type="text"
            name="Coolant"
            placeholder="Coolant"
            value={this.state.Coolant}
            onChange={this.handleChange}
          />
         </div>

        <div className="image-uploaders">
          {this.state.Motor && this.state.editMode ? (
            <div className="Specs-manager-image-wrapper">
              <img src={this.state.Motor} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("Motor")}>Remove file</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.MotorRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleMotorDrop()}
            >
              <div className="dz-message">Motor</div>
            </DropzoneComponent>
          )}

          {this.state.QRCode && this.state.editMode ? (
            <div className="Specs-manager-image-wrapper">
              <img src={this.state.QRCode} />

              <div className="image-removal-link">
                <a onClick={() => this.deleteImage("QRCode")}>Remove file</a>
              </div>
            </div>
          ) : (
            <DropzoneComponent
              ref={this.QRCodeRef}
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={this.handleQRCodeDrop()}
            >
              <div className="dz-message">QRCode</div>
            </DropzoneComponent>
          )}
        </div>

        <div>
          <button className="btn" type="submit">
            Save
          </button>
        </div>
      </form>
    );
  }
}
