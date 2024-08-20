import React, { Component } from "react";
import NavigationComponent from "../navigation-container";
import Styles from "../../style/homepage.scss";
import SecRec1 from "../../../static/assets/images/Secrec1.png"
export default class Home extends Component {
  render() {
    return (
      <div className="homepage">
        <p>Welcome to the Secure Recycling Maintenance Tracker</p><br></br>
        <img src={SecRec1}></img>
      </div>
    );
  }
}
