import React, { Component } from "react";
import moment from "moment";
import styles from "../style/app.scss";
import Background from "../../static/assets/images/SECUREBACKSPLASH.png";

export default class Header extends Component {
  render() {
    const BackGround = {
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover", // Ensure the image covers the whole div
      backgroundPosition: "center", // Center the image
      backgroundRepeat: "no-repeat",
      zIndex:"-1",
    };
    return (
      <div className="title" style={BackGround}>
        <h1>Maintenance Tracker</h1>
        <div>{moment().format("MMM DD , yyyy hh:mm")}</div>
      </div>
    );
  }
}
