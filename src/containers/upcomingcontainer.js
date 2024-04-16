import React, { Component } from "react";

import Styles from "../style/app.scss";

export default class UpcomingContainer extends Component {
  render() {
    return (
      <div className="Upcoming_container">
        <button onClick={showHideupcoming} className="Upcoming button">
          Upcoming Maint within 30 days
        </button>
        <div id="Up" className="Upcoming-content">
          <div>content</div>
          <div>content</div>
          <div>content</div>
        </div>
      </div>
    );
  }
}
function showHideupcoming() {
  var upcoming = document.getElementById("Up");
  upcoming.classList.toggle("show");
}
