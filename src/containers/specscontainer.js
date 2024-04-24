import React, { Component } from "react";

import Styles from "../style/app.scss";


export default class SpecsContainer extends Component {
  render() {
    return (
      <div className="Specs_container">
        <button onClick={showHideequip} className="Equipment button">
          Equipment Specs
        </button>
        <div id="Specs" className="Equipment-content">
          
        </div>
      </div>
    );
  }
}

  function showHideequip() {
    var specs = document.getElementById("Specs");
    specs.classList.toggle("show");
  }
