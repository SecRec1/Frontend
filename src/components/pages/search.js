import React, { Component } from "react";
import SearchForm from "../forms/search-form";
import SearchModal from "../modals/search-modal";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      specsitems: [],
          };
   
  }
  

  
  render() {
    return (
      <div><SearchForm/>
        
      </div>
    );
  }
}


