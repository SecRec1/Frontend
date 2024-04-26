import React, { Component } from "react";
import axios from "axios";

import SpecsForm from "../forms/add-form";

export default class SpecsManager extends Component {
  constructor() {
    super();

    this.state = {
      specsItems: [],
      specsToEdit: {},
    };

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearSpecsToEdit = this.clearSpecsToEdit.bind(this);
  }

  clearSpecsToEdit() {
    this.setState({
      specsToEdit: {},
    });
  }

  handleEditClick(specsItem) {
    this.setState({
      specsToEdit: specsItem,
    });
  }

  handleDeleteClick(specsItem) {
    axios
      .delete(`https://api.devcamp.space/specs/specs_items/${specsItem.sn}`)
      .then((response) => {
        this.setState({
          specsItems: this.state.specsItems.filter((item) => {
            return item.id !== specsItem.id;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("handleDeleteClick error", error);
      });
  }

  handleEditFormSubmission() {
    this.getSpecsItems();
  }

  handleNewFormSubmission(specsItem) {
    this.setState({
      specsItems: [specsItem].concat(this.state.specsItems),
    });
  }

  handleFormSubmissionError(error) {
    console.log("handleFormSubmissionError error", error);
  }

  getSpecsItems() {
    axios
      .get("http://127.0.0.1:5000/Specs/Specs_items")
      .then((response) => {
        // console.log("response.data.specs_items", response.data.specs_items);
        this.setState({
          specsItems: [...response.data.specs_items],
        });
      })
      .catch((error) => {
        console.log("error in getSpecsItems", error);
      });
  }

  componentDidMount() {
    this.getSpecsItems();
  }

  render() {
    return (
      <div className="specs-manager-wrapper">
        <div className="left-column">
          <SpecsForm
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            clearSpecsToEdit={this.clearSpecsToEdit}
            specsToEdit={this.state.specsToEdit}
          />
        </div>
      </div>
    );
  }
}
