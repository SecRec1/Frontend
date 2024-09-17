import React, { Component } from "react";
import axios from "axios";

import TaskManager from "../task-container";
import SpecsItem from "../specs-item";

import Styles from "../../style/specs-page.scss";
import SpecsEditor from "../spec-editor";

import Loading from "../loading";

export default class SpecsDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      specsItem: {},
      loading:true,
    };
    this.getSpecsItem = this.getSpecsItem.bind(this);
    this.printCode = this.printCode.bind(this);
  }
  
  printCode() {
    // Create a new window for printing
    const printWindow = window.open("", "", "height=800,width=800");
  
    // Add HTML content to the new window
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh; /* Full height of the page for vertical centering */
            }
            .label-container {
              width: 2in;  /* Adjust based on the actual label size */
              height: 1in; /* Adjust based on the actual label size */
              display: flex;
              justify-content: center;
              align-items: center;
            }
            img {
              width: 175%; /* Scale slightly beyond 100% for a bigger image */
              height: auto; /* Maintain aspect ratio */
              max-width: none; /* Remove max limits to allow bigger size */
              max-height: none;
              object-fit: contain; /* Ensure image scales while keeping aspect ratio */
            }
            @media print {
              @page {
                size: auto;
                margin: 0; /* No margins for the printed label */
              }
              body {
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="label-container">
            <img src="${this.state.specsItem.qrcode}" alt="QR Code" />
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
  
  
  componentDidMount() {
    this.getSpecsItem();
    this.setState({ loading: false });
  }

  getSpecsItem() {
    axios
      .get(`https://backend-1-jevl.onrender.com/Specs/${this.props.specsn}`)

      .then((response) => {
        this.setState({ specsItem: response.data });
      })
      .catch((error) => console.log("detail page getSpec error", error));
  }

  specsItem() {
    return this.state.specsItem.map((item) => {
      return <SpecsItem key={item.sn} item={item} />;
    });
  }

  render() {
    if (this.state.loading) {
      // Display the loader if the app is still loading
      return <Loading />;
    }
    const isDisabled = !this.props.loggedin;
    return (
      <div key={this.state.specsItem.sn} className="Specs-item-container">
        <div className="text-content">
          <div className="item-card">
            <div className="leftside">
              <button
                className="top"
                style={{ background: "none", border: "none" }}
                onClick={this.printCode}
              >
                <img className="qrcode" src={this.state.specsItem.qrcode} />
              </button>

              <div className="bottom">
                <img className="motor plate" src={this.state.specsItem.motor} />
              </div>
            </div>

            <div className="rightside">
              <div className="left">
                <h6 className="serialnumber item">
                  Serial Number<br></br>
                  {this.state.specsItem.sn}
                </h6>

                <h6 className="name item">
                  Make/Model<br></br>
                  {this.state.specsItem.name}
                </h6>
                <h6 className="designator item">
                  Machine Type<br></br>
                  {this.state.specsItem.designator}
                </h6>
                <h6 className="subdesignator item">
                  Machine Sub-Type<br></br>
                  {this.state.specsItem.subdesignator}
                </h6>
              </div>
              <div className="right">
                <h6 className="department item">
                  Department<br></br>
                  {this.state.specsItem.department}
                </h6>
                <h6 className="oil item">
                  Oil Type<br></br>
                  {this.state.specsItem.oil}
                </h6>
                <h6 className="coolant item">
                  Coolant Type<br></br>
                  {this.state.specsItem.coolant}
                </h6>
                <h6 className="hours item">
                  Machine Hours:<br></br>
                  {this.state.specsItem.hours}
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className={`action-icon ${isDisabled ? "disabled" : ""}`}
          >
            <SpecsEditor specsItem={this.state.specsItem} />
          </a>
        </div>
      </div>
    );
  }
}
