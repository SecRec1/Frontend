import React, { Component } from "react";

import "../style/app.scss";
import SpecsContainer from "../containers/specscontainer";
import UpcomingContainer from "../containers/upcomingcontainer";
import OverdueContainer from "../containers/overduecontainer";
import DueContainer from "../containers/duecontainer";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="title">
          <h1>Maintanence Tracker</h1>
        </div>
        <div className="Button_container">
          <div className="Equipment_container">
            <div className="Code">QRCode</div>
            <div className="Name">Equipment Name</div>
          </div>
          <SpecsContainer />
          <OverdueContainer />
          <DueContainer />
          <UpcomingContainer />
        </div>
      </div>
    );
  }
}
