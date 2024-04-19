import React, { Component } from "react";
import axios from "axios";
import DropzoneComponent from "react-dropzone-component";
import ReactHtmlParser from "react-html-parser";

export class ItemDetail extends Component() {
  render() {
    return (
      <div className="Button_container">
        <div className="Equipment_container">
          <div className="Code">QRCode</div>
          <div className="Name">Equipment Name</div>
        
          <SpecsContainer />
          <OverdueContainer />
          <DueContainer />
          <UpcomingContainer />
        </div>
      </div>
    );
  }
}
