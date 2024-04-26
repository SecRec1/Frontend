import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";

export default class SpecsForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sn: "",
      name: "",
      qrcode: "",
      designator: "",
      subdesignator: "",
      oil: "",
      coolant: "",
      department: "",
      motor: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);

    this.deleteImage = this.deleteImage.bind(this);
    this.handleMotorDrop = this.handleMotorDrop.bind(this);
    this.handleQRCodeDrop = this.handleQRCodeDrop.bind(this);

    this.MotorRef = React.createRef();
    this.QRCodeRef = React.createRef();
  }

  deleteImage(imageType) {
    axios
      .delete(
        `http://127.0.0.1/Specs/delete-specs-image/${this.state.sn}?image_type=${imageType}`
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
    if (Object.keys(this.props.specsToEdit).length > 0) {
      const {
        sn,
        name,
        designator,
        subdesignator,
        oil,
        coolant,
        motor,
        qrcode,
        department,
      } = this.props.specsToEdit;

      this.props.clearSpecsToEdit();

      this.setState({
        sn: sn,
        name: name || "",
        designator: designator || "",
        subdesignator: subdesignator || "eCommerce",
        oil: oil || "",
        coolant: coolant || "",
        department: department || "",
        motor: motor || "",
        qrcode: qrcode || "",
        editMode: true,
        apiUrl: `http://127.0.0.1/Specs/specs_items/${sn}`,
        apiAction: "patch",
      });
    }
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

  buildForm() {
    let formData = new FormData();

    formData.append(`Specs[sn]`, this.state.sn);
    formData.append(`Specs[name]`, this.state.name);
    formData.append(`Specs[designator]`, this.state.designator);
    formData.append(`Specs[subdesignator]`, this.state.subdesignator);
    formData.append(`Specs[oil]`, this.state.oil);
    formData.append(`Specs[coolant]`, this.state.coolant);
    formData.append(`Specs[department]`, this.state.department);

    if (this.state.motor_image) {
      formData.append(`Specs[motor]`, this.state.motor);
    }

    if (this.state.qrcode_image) {
      formData.append(`Specs[qrcode]`, this.state.qrcode);
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
      method: "post",
      url: "http://127.0.0.1:5000/Specs",
      data: this.buildForm(),
      headers: {
        "Content-Type": "multipart/form-data, application/json",
      },
    })
      .then((response) => {
        console.log("specs form handleSubmit response", response.data);
        if (this.state.editMode) {
          this.props.handleEditFormSubmission();
        } else {
          this.props.handleNewFormSubmission(response.data.specs_item);
        }

        this.setState({
          sn: "",
          name: "",
          designator: "",
          subdesignator: "",
          oil: "",
          coolant: "",
          department: "",
          editMode: false,
        });

        [this.motorRef, this.qrcodeRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("specs form handleSubmit error", error);
      });

    event.preventDefault();
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
        </div>
        <div className="">
          <select
            name="designator"
            value={this.state.designator}
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

        <button type="submit" onClick={this.handleSubmit}>
          Save
        </button>
      </form>
    );
  }
}
