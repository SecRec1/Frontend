import React, { Component } from "react";

import SearchModal from "../modals/search-modal";


export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specsitems: [],
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }
  closeModal() {
    this.setState({ showModal: false });
  }
  render() {
    return (
      <div>
        <SearchModal
          closeModal={this.closeModal}
          showModal={this.state.showModal}
        />
        <button onClick={this.openModal}>Search by specs</button>
        
      </div>
    );
  }
}
