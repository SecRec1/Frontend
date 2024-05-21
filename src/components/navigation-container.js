import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import styles from "../style/NavStyles.scss";

const NavigationComponent = (props) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <NavLink exact to="/scan" activeClassName="nav-link-active">
          Scan
        </NavLink>

        <NavLink to="/search" activeClassName="nav-link-active">
          Search
        </NavLink>

        <NavLink to="/Specsmanager" activeClassName="nav-link-active">
          Specs Manager
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(NavigationComponent);
