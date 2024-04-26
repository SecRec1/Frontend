import React, { Component } from "react";
import axios from "axios";


export default class SearchForm extends Component {
  constructor(props) {
    super(props);
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
    };

    this.componentConfig = this.componentConfig.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.buildForm = this.buildForm.bind(this);
    this.getRecords = this.getRecords.bind(this);

    this.djsConfig = this.djsConfig.bind(this);
    this.MotorRef = React.createRef();
    this.QRCodeRef = React.createRef();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  buildForm() {
    let formData = new FormData();

    formData.append("Specs[QRCode]", this.state.QRCode);
    formData.append("Specs[sn]", this.state.sn);
    formData.append("Specs[Name]", this.state.Name);
    formData.append("Specs[Designator]", this.state.Designator);
    formData.append("Specs[Subdesignator]", this.state.Subdesignator);
    formData.append("Specs[Oil]", this.state.Oil);
    formData.append("Specs[Coolant]", this.state.Coolant);
    formData.append("Specs[Department]", this.state.Department);
    formData.append("Specs[Motor]", this.state.Motor);

    return formData;
  }

  getRecords() {
    axios
      .get("http://127.0.0.1:5000/Specs")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getRecords();
  }

  handleSearch() {
    axios.get({
      url: `http://127.0.0.1:5000/Specs/${this.buildForm}`,
      data: {
        sn: "",
        Name: "",
        QRCode: "",
        Designator: "",
        Subdesignator: "",
        Oil: "",
        Coolant: "",
        Department: "",
        Motor: "",
      },
    });
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
  render() {
    return (
      <div>
        Search Page
        <form onSubmit={this.handleSubmit}>
          <div className="Searchbar">
            <input
              type="text"
              name="Name"
              placeholder="Equipment Name"
              value={this.state.Name}
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
              name="Department"
              placeholder="Department"
              value={this.state.Department}
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
              placeholder="Oil Type"
              value={this.state.Oil}
              onChange={this.handleChange}
            />

            <input
              type="text"
              name="Coolant"
              placeholder="Coolant Type"
              value={this.state.Coolant}
              onChange={this.handleChange}
            />
          </div>
        </form>
        <button type="submit" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}
