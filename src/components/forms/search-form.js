import React, { Component } from "react";
import axios from "axios";

import SearchList from "../forms/search-list";

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      filteredrecords: [],
      finalfilteredrecords: [],
      designator: "none",
      subdesignator: "none",
      showModal: false,
    };
    this.getRecords = this.getRecords.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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

  handleSubmit(event) {
    event.preventDefault();
    this.handleFilter();
  }
  componentDidMount() {
    this.getRecords();
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
              <option value="Untha ZR2400">Untha ZR2400</option>
              <option value="Untha XRM3000C">Untha XRM3000C</option>
              <option value="Ring Mill">Ring Mill</option>
              <option value="Eddy Current">Eddy Current</option>
              <option value="Optical Sorter">Optical Sorter</option>
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
