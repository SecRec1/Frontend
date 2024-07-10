import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

import RichTextEditor from "../../rich/rich-text-editor";

import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      sn: "",
      name: "",
      qrcode: "",
      designator: "",
      subdesignator: "",
      oil: "",
      coolant: "",
      department: "",
      motor: "",
      hours: "",
      editMode: false,
      specsid: "",
      apiUrl: `127.0.0.1:5000/Specs/${sn}`,
        apiAction: "patch",
    };
    

    this.handleSpecsId = this.handleSpecsId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.handleMotorDrop = this.handleMotorDrop.bind(this);
    this.handleQRCodeDrop = this.handleQRCodeDrop.bind(this);

    this.motorRef = React.createRef();
    this.qrcodeRef = React.createRef();

    
  }
  
  componentDidUpdate() {
    if (Object.keys(this.props.specsToEdit).length > 0) {
      const {
        id,
        qrcode,
        sn,
        name,
        designator,
        subdesignator,
        oil,
        coolant,
        department,
        motor,
        hours,
      } = this.props.specsToEdit;

      this.props.clearSpecsToEdit();
      this.setState({
        id: id,
        sn: sn || "",
        name: name || "",
        qrcode: qrcode || "",
        designator: designator || "",
        subdesignator: subdesignator || "",
        oil: oil || "",
        coolant: coolant || "",
        department: department || "",
        motor: motor || "",
        hours: hours || "",
        editMode: true,
        apiUrl: `127.0.0.1:5000/Specs/${sn}`,
        apiAction: "patch",
      });
    }
  }
  handleSpecsId() {
    axios.get(`http://127.0.0.1:5000/Specs`).then((response) => {
      this.setState({ specsid: response.data.length + 1 });
    });
  }

  handleMotorDrop() {
    return {
      addedfile: (file) => this.setState({ motor: file }),
    };
  }

  handleQRCodeDrop() {
    return {
      addedfile: (file) => this.setState({ qrcode: file }),
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

  handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.append("id", this.state.specsid);
    if (this.state.qrcode) {
      formData.append("qrcode", this.state.qrcode.dataURL);
    }

    if (this.state.motor) {
      formData.append("motor", this.state.motor.dataURL);
    }
    const data = Object.fromEntries(formData);

    axios({
      method: this.state.apiAction,
      url: this.state.apiUrl,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        this.props.handleNewFormSubmission(response);
        this.setState({
          id: "",
          sn: "",
          name: "",
          qrcode: "",
          designator: "",
          subdesignator: "",
          oil: "",
          coolant: "",
          department: "",
          motor: "",
          hours: "",
          editMode: "False",
        });
        [this.motorRef, this.qrcodeRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    this.handleSpecsId();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="Searchbar">
          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="sn"
            placeholder="Equipment sn"
            value={this.state.sn}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={this.state.department}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="hours"
            placeholder="Hours"
            value={this.state.hours}
            onChange={this.handleChange}
          />
        </div>
        <div className="">
          <select
            name="designator"
            value={this.state.designator}
            onChange={this.handleChange}
            className="select-element"
          >
            <option value="none">None</option>
            <option value="Untha ZR2400">Untha ZR2400</option>
            <option value="Untha XR">Untha XR</option>
            <option value="Ring Mill">Ring Mill</option>
            <option value="Optical Sorter">Optical Sorter</option>
            <option value="Eddy Current">Eddy Current</option>
          </select>

          <select
            name="subdesignator"
            value={this.state.subdesignator}
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
            name="oil"
            placeholder="Oil Type"
            value={this.state.oil}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="coolant"
            placeholder="Coolant Type"
            value={this.state.coolant}
            onChange={this.handleChange}
          />
          <DropzoneComponent
            ref={this.motorRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleMotorDrop()}
          >
            <div className="dz-message">Motor Plate</div>
          </DropzoneComponent>
          <DropzoneComponent
            ref={this.qrcodeRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleQRCodeDrop()}
          >
            <div className="dz-message">QRCode</div>
          </DropzoneComponent>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
