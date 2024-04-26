import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import SpecsItem from "../specs-item";
import AddModal from "../modals/add-modal";
import SpecsModal from "../modals/specs-modal";
import AddForm from "../forms/add-form";

class Specs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SpecsItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: false,
      specsModalIsOpen: false,
    };

    this.getSpecsItems = this.getSpecsItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);
    this.handleNewSpecsClick = this.handleNewSpecsClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleSuccessfulNewSpecsSubmission =
      this.handleSuccessfulNewSpecsSubmission.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleDeleteClick(Specs) {
    axios
      .delete(`http://127.0.0.1:5000/Specs/${Specs.sn}`)
      .then((response) => {
        this.setState({
          SpecsItems: this.state.SpecsItems.filter((SpecsItem) => {
            return Specs.sn !== SpecsItem.sn;
          }),
        });

        return response.data;
      })
      .catch((error) => {
        console.log("delete Specs error", error);
      });
  }

  handleSuccessfulNewSpecsSubmission(Specs) {
    this.setState({
      specsModalIsOpen: false,
      SpecsItems: [Specs].concat(this.state.SpecsItems),
    });
  }

  handleModalClose() {
    this.setState({
      specsModalIsOpen: false,
    });
  }

  handleNewSpecsClick() {
    this.setState({
      specsModalIsOpen: true,
    });
  }

  onScroll() {
    if (
      this.state.isLoading ||
      this.state.SpecsItems.length === this.state.totalCount
    ) {
      return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.getSpecsItems();
    }
  }

  getSpecsItems() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });

    axios
      .get(`http://127.0.0.1:5000/Specs?page=${this.state.currentPage}`)
      .then((response) => {
        this.setState({
          SpecsItems: [this.state.SpecsItems.concat(response.data.Specs)],
          totalCount: response.data.meta.total_records,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log("getSpecsItems error", error);
      });
  }

  componentWillMount() {
    this.getSpecsItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const SpecsRecords = this.state.SpecsItems.map((SpecsItem) => {
      return (
        <div className="admin-blog-wrapper">
          <SpecsItem key={SpecsItem.sn} SpecsItem={SpecsItem} />
          <a onClick={() => this.handleDeleteClick(SpecsItem)}>
            <FontAwesomeIcon icon="trash" />
          </a>
        </div>
      );
    });

    return (
      <div className="Specs-container">
        <SpecsModal
          handleSuccessfulNewSpecsSubmission={
            this.handleSuccessfulNewSpecsSubmission
          }
          handleModalClose={this.handleModalClose}
          specsModalIsOpen={this.state.specsModalIsOpen}
        />

        <div className="new-specs-link">
          <a onClick={this.handleNewSpecsClick}>
            <FontAwesomeIcon icon="plus-circle" />
          </a>
        </div>

        <div className="content-container">{SpecsRecords}</div>

        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Specs;
