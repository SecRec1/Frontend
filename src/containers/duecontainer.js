import React, { Component } from "react";

import Styles from "../style/app.scss";

export default class DueContainer extends Component {
  render() {
    return (
      <div className="Due_container">
        <button onClick={showHidedue} className="Due button">
          Maint due within 7 days
        </button>
        <div id="Due" className="Due-content">
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </div>
      </div>
    );
  }
}
function showHidedue() {
  var due = document.getElementById("Due");
  due.classList.toggle("show");
}
