import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import QRCode from "qrcode.react";
import RichTextEditor from "../../rich/rich-text-editor";
import DesignatorOptions from "../forms/option-lists/designator-options";
import SubDesignatorOptions from "../forms/option-lists/subdes-options";
import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";
import styles from "../../style/edit-form";

export default class EditForm extends Component {
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
      deslistcomponent: [],
      subdeslistcomponent: [],
      editMode: false,
      specsid: "",
      //apiUrl: `https://backend-1-jevl.onrender.com/Specs/${this.state.sn}`,
      apiAction: "patch",
    };

    this.handleSpecsId = this.handleSpecsId.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.getDesListItems = this.getDesListItems.bind(this);
    this.getSubDesListItems = this.getSubDesListItems.bind(this);
    this.handleMotorDrop = this.handleMotorDrop.bind(this);
    this.handleQRCodeDrop = this.handleQRCodeDrop.bind(this);
    this.handleDesignatorChange = this.handleDesignatorChange.bind(this);
    this.handleSubDesignatorChange = this.handleSubDesignatorChange.bind(this);
    this.handleSubmitDes = this.handleSubmitDes.bind(this);
    this.handleSubmitSubDes = this.handleSubmitSubDes.bind(this);
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
        qrcode: qrcode.dataURL || "",
        designator: designator || "",
        subdesignator: subdesignator || "",
        oil: oil || "",
        coolant: coolant || "",
        department: department || "",
        motor: motor.dataURL || "",
        hours: hours || "",
        editMode: true,
        apiUrl: `https://backend-1-jevl.onrender.com/Specs/${sn}`,
        apiAction: "PUT",
      });
    }
  }
  handleSpecsId() {
    axios.get(`https://backend-1-jevl.onrender.com/Specs`).then((response) => {
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

  async handleSubmit(event) {
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
      method: "PUT",
      url: `https://backend-1-jevl.onrender.com/Specs/${this.state.sn}`,
      data: data,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        this.props.handleFormSubmit(response);
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
    this.props.handleCloseModal();
    window.location.reload();
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubDesignatorChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue === "new-entry") {
      this.setState({ showNewSubDesignatorInput: true, subdesignator: "" });
    } else {
      this.setState({
        subdesignator: selectedValue,
        showNewSubDesignatorInput: false,
      });
    }
  }

  handleSubmitSubDes(event) {
    event.preventDefault();

    // Check if 'sn' is empty
    if (this.state.sn === "") {
      alert("Serial Number (SN) cannot be empty.");
      return; // Stop the form submission if 'sn' is empty
    }

    // Add the new designator to the list if it was entered
    let deslistcomponent = [...this.state.deslistcomponent];
    if (this.state.showNewDesignatorInput && this.state.designator !== "") {
      deslistcomponent.push(this.state.designator);
      this.setState({ deslistcomponent }); // Update the state
    }

    // The rest of your form submission logic
    //...
  }
  handleSubmitDes(event) {
    event.preventDefault();

    // Check if 'sn' is empty
    if (this.state.sn === "") {
      alert("Serial Number (SN) cannot be empty.");
      return; // Stop the form submission if 'sn' is empty
    }

    // Add the new designator to the list if it was entered
    let deslistcomponent = [...this.state.deslistcomponent];
    if (this.state.showNewDesignatorInput && this.state.designator !== "") {
      deslistcomponent.push(this.state.designator);
      this.setState({ deslistcomponent }); // Update the state
    }

    // The rest of your form submission logic
    //...
  }

  handleDesignatorChange(event) {
    const selectedValue = event.target.value;

    if (selectedValue === "new-entry") {
      this.setState({ showNewDesignatorInput: true, designator: "" });
    } else {
      this.setState({
        designator: selectedValue,
        showNewDesignatorInput: false,
      });
    }
  }
  getDesListItems() {
    axios
      .get("https://backend-1-jevl.onrender.com/Specs") // Fetch the Specs data
      .then((response) => {
        // Extract the designators from the Specs objects
        const designators = response.data.map((item) => item.designator);

        // Get unique designators by using Set
        const uniqueDesignators = [...new Set(designators)];

        // Update the state with the unique designators
        this.setState({
          deslistcomponent: uniqueDesignators,
        });
      })
      .catch((error) => {
        console.error("Error fetching Specs:", error);
      });
  }
  getSubDesListItems() {
    axios
      .get("https://backend-1-jevl.onrender.com/Specs") // Fetch the Specs data
      .then((response) => {
        // Extract the designators from the Specs objects
        const Subdesignators = response.data.map((item) => item.subdesignator);

        // Get unique designators by using Set
        const uniqueSubDesignators = [...new Set(Subdesignators)];

        // Update the state with the unique designators
        this.setState({
          subdeslistcomponent: uniqueSubDesignators,
        });
      })
      .catch((error) => {
        console.error("Error fetching Specs:", error);
      });
  }
  componentDidMount() {
    this.handleSpecsId();
    this.getDesListItems();
    this.getSubDesListItems();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="edit-form">
        <div className="left-left">
          <h1>Equipment Name</h1>
          <input
            type="text"
            name="name"
            placeholder="Equipment Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <h1>Equipment SN</h1>
          <input
            type="text"
            name="sn"
            placeholder="Equipment sn"
            value={this.state.sn}
            onChange={this.handleChange}
          />
          <h1>Department</h1>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={this.state.department}
            onChange={this.handleChange}
          />
          <h1>Machine Hours</h1>
          <input
            type="text"
            name="hours"
            placeholder="Hours"
            value={this.state.hours}
            onChange={this.handleChange}
          />
        </div>

        <div className="left-right">
          <h1>Designator</h1>
          <select
            name="designator"
            value={this.state.designator}
            onChange={this.handleDesignatorChange}
            className="select-element"
          >
            <option value="placeholder">Pick a Designator</option>
            <option value="new-entry">Add New Designator...</option>
            <DesignatorOptions desitems={this.state.deslistcomponent} />
          </select>
          {this.state.showNewDesignatorInput && (
            <input
              type="text"
              name="designator"
              placeholder="Enter New Designator"
              value={this.state.designator} // Bind the input value to the designator state
              onChange={this.handleChange}
            />
          )}
          <h1>Sub-Designator</h1>
          <select
            name="subdesignator"
            value={this.state.subdesignator}
            onChange={this.handleSubDesignatorChange}
            className="select-element"
          >
            <option value="placeholder">Pick a Subdesignator</option>
            <option value="new-entry">Add New Subdesignator...</option>
            <SubDesignatorOptions
              subdesitems={this.state.subdeslistcomponent}
            />
          </select>
          {this.state.showNewSubDesignatorInput && (
            <input
              type="text"
              name="subdesignator"
              placeholder="Enter New Subdesignator"
              value={this.state.subdesignator} // Bind the input value to the designator state
              onChange={this.handleChange}
            />
          )}
          <h1>Oil Type</h1>
          <input
            type="text"
            name="oil"
            placeholder="Oil Type"
            value={this.state.oil}
            onChange={this.handleChange}
          />
          <h1>Coolant Type</h1>
          <input
            type="text"
            name="coolant"
            placeholder="Coolant Type"
            value={this.state.coolant}
            onChange={this.handleChange}
          />
        </div>
        <div className="right">
          <QRCode
            ref={this.qrcodeRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            value={`/Specs/${this.state.sn}`}
          />
          <DropzoneComponent
            ref={this.motorRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleMotorDrop()}
          >
            <div className="dz-message">Motor Plate</div>
          </DropzoneComponent>
        </div>

        <button type="submit">Save</button>
      </form>
    );
  }
}
