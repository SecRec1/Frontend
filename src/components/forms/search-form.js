import React, { Component } from "react";
import axios from "axios";

import SearchList from "../forms/search-list";
import DesignatorOptions from "./option-lists/designator-options";
import SubDesignatorOptions from "./option-lists/subdes-options";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      filteredrecords: [],
      finalfilteredrecords: [],
      designator: "none",
      subdesignator: "none",
      deslistcomponent: [],
      subdeslistcomponent: [],
      showModal: false,
    };
    this.getRecords = this.getRecords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDesListItems = this.getDesListItems.bind(this);
    this.handleDesChange = this.handleDesChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterRecordsStageOne = this.filterRecordsStageOne.bind(this);
    this.filterRecordsStageTwo = this.filterRecordsStageTwo.bind(this);
  }
  handleFilter() {
    if (this.state.designator !== "none") {
      this.filterRecordsStageOne();
    } else if (
      this.state.designator === "none" &&
      this.state.subdesignator !== "none"
    ) {
      this.filterRecordsStageTwo();
    } else if (
      this.state.designator === "none" &&
      this.state.subdesignator === "none"
    ) {
      this.setState({ finalfilteredrecords: [] });
    }
  }

  SpecsItems() {
    return this.state.data.map((item) => {
      return <SpecsItem key={item.id} item={item} />;
    });
  }
  getRecords() {
    axios
      .get("http://192.168.1.231:8000/Specs")
      .then((response) => {
        this.setState({
          records: response.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  filterRecordsStageOne() {
    const filteredRecordsSO = this.state.records.filter(
      (rec) => rec.designator === this.state.designator
    );

    this.setState({ filteredrecords: filteredRecordsSO }, () => {
      if (this.state.subdesignator !== "none") {
        this.filterRecordsStageTwo();
      } else {
        this.setState({ finalfilteredrecords: this.state.filteredrecords });
      }
    });
  }
  filterRecordsStageTwo() {
    const filteredRecordsSTO = this.state.filteredrecords.filter(
      (rec) => rec.subdesignator === this.state.subdesignator
    );
    const filteredRecordsSTT = this.state.records.filter(
      (rec) => rec.subdesignator === this.state.subdesignator
    );
    if (this.state.designator === "none") {
      this.setState({ finalfilteredrecords: filteredRecordsSTT });
    } else {
      this.setState({ finalfilteredrecords: filteredRecordsSTO });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  getDesListItems() {
    axios
      .get("http://192.168.1.231:8000/Specs") // Fetch the Specs data
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
      .get("http://192.168.1.231:8000/Specs") // Fetch the Specs data
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
  handleDesChange(event) {
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

  handleSubmit(event) {
    event.preventDefault();
    this.handleFilter();
  }

  componentDidMount() {
    this.getRecords();
    this.getDesListItems();
    this.getSubDesListItems();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="">
            <select
              name="designator"
              value={this.state.designator}
              onChange={this.handleChange}
              className="select-element"
            >
              <option value="none">None</option>
              <DesignatorOptions desitems={this.state.deslistcomponent} />
            </select>

            <select
              name="subdesignator"
              value={this.state.subdesignator}
              onChange={this.handleChange}
              className="select-element"
            >
              <option value="none">None</option>
              <SubDesignatorOptions subdesitems={this.state.subdeslistcomponent}/>
              {/* <option value="Main">Main</option>
              <option value="Infeed">Infeed</option>
              <option value="Discharge">Discharge</option>
              <option value="Crossbelt">Crossbelt</option>
              <option value="Vibratory Mover">Vibratory Mover</option> */}
            </select>
          </div>

          <button type="submit">Search</button>
        </form>
        <div>
          <SearchList records={this.state.finalfilteredrecords} />
        </div>
      </div>
    );
  }
}
