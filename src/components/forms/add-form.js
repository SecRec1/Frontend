import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import { QRCodeCanvas } from "qrcode.react";
import RichTextEditor from "../../rich/rich-text-editor";
import DesignatorOptions from "../forms/option-lists/designator-options";
import SubDesignatorOptions from "../forms/option-lists/subdes-options";
import filepickerCss from "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 1,
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
      showNewDesignatorInput: false,
      showNewSubDesignatorInput: false,
      
      specsid: "",
      apiUrl: "https://backend-1-jevl.onrender.com/Specs",
      apiAction: "post",
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
    this.handleSubmitDes = this.handleSubmitDes.bind(this);
    this.handleSubDesignatorChange = this.handleSubDesignatorChange.bind(this);
    this.handleSubmitSubDes = this.handleSubmitSubDes.bind(this);

    this.motorRef = React.createRef();
    this.qrcodeRef = React.createRef();
  }

  handleSpecsId = async () => {
    try {
      const response = await axios.get("https://backend-1-jevl.onrender.com/Specs");
      const existingIds = response.data.map((item) => item.id);

      let newId = this.state.id;
      while (existingIds.includes(newId)) {
        newId++;
      }

      this.setState({ id: newId });
    } catch (error) {
      console.error("Error fetching specs or finding available ID:", error);
    }
  };

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

    // Check if 'sn' is empty
    if (this.state.sn === "") {
      alert("Serial Number (SN) cannot be empty.");
      return; // Stop the form submission if 'sn' is empty
    }
    if (this.state.sn.includes("\\" || "//")) {
      alert("Serial Number (SN) cannot contain any slash.");
      return; // Stop the form submission if 'sn' contains a backslash
    }
    

    const qrCodeCanvas = document.querySelector("canvas");
    const qrCodeDataURL = qrCodeCanvas.toDataURL();
    const formData = new FormData(event.currentTarget);
    formData.append("id", this.state.id);
    formData.append("qrcode", qrCodeDataURL);

    if (this.state.motor) {
      formData.append("motor", this.state.motor.dataURL);
    }

    const data = Object.fromEntries(formData);

    axios({
      method: this.state.apiAction,
      url: "https://backend-1-jevl.onrender.com/Specs",
      data: data,
    })
      .then((response) => {
        this.props.handleNewFormSubmission(response);
        this.setState({
          id: 1,
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
        });
        [this.motorRef, this.qrcodeRef].forEach((ref) => {
          ref.current.dropzone.removeAllFiles();
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    window.location.reload();
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
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
    if (!this.props.loggedin) {
      return null;
    }
    const myStyle = {
      display: "grid",
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      width: "128",
      height: "128",
    };
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <div className="add-left">
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
        <div className="add-right">
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

          <select
            name="subdesignator"
            value={this.state.subdesignator}
            onChange={this.handleSubDesignatorChange}
            className="select-element"
          >
             <option value="placeholder">Pick a Subdesignator</option>
             <option value="new-entry">Add New Subdesignator...</option>
             <SubDesignatorOptions subdesitems={this.state.subdeslistcomponent} />
            
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
        </div>
        <div className="file-holder" style={myStyle}>
          <QRCodeCanvas
            className="qrcode"
            value={`http://192.168.1.231:8080/#/Specs/${this.state.sn}`}
          />
        </div>
        <DropzoneComponent
          className="file"
          ref={this.motorRef}
          config={this.componentConfig()}
          djsConfig={this.djsConfig()}
          eventHandlers={this.handleMotorDrop()}
        >
          <div className="dz-message">Motor Plate</div>
        </DropzoneComponent>

        <button className="save" type="submit">
          Save
        </button>
      </form>
    );
  }
}
