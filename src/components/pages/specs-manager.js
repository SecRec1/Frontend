import React, { Component } from "react";
import axios from "axios";

import AddForm from "../forms/add-form";
import Search from "../forms/search-form";
import RecordList from "../list-component";
import SpecsContainer from "../Specs-container";

export default class SpecsManager extends Component {
  constructor() {
    super();
    this.state = {
      specsItems: [],
      SpecsPageToEdit: {}
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleSuccessfulFormSubmission =
      this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.getSpecsItems = this.getSpecsItems.bind(this);
  }

  getSpecsItems() {
    axios
      .get(`http://127.0.0.1:5000/Specs`)
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  handleFormSubmissionError(error) {
    console.log("Submission error", error);
  }
  handleNewFormSubmission(specsItem) {
    this.setState({
      specsItems: [specsItem].concat(this.state.specsItems)
    });
  }
  handleSuccessfulFormSubmission(specsItem) {
    console.log("specsItem", specsItem);
  }
  handleDeleteClick(specsItem) {
    console.log("delete", specsItem);
  }

  render() {
    return (
      <div className="specs-manager-wrapper">
        <AddForm
          handleFormSubmissionError={this.handleFormSubmissionError}
          handleNewFormSubmission={this.handleNewFormSubmission}
          handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
        />
        <Search />
        <RecordList
          data={this.state.specsItems}
          handleDeleteClick={this.handleDeleteClick}
        />
        <SpecsContainer />
      </div>
    );
  }
}
