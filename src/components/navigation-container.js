import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styles from "../style/NavStyles.scss";
import Auth from "./pages/auth";
import "../style/NavStyles.scss";

const NavigationComponent = (props) => {
  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <div className="link-wrapper">
          
          <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "nav-link-active home" : "home")}
        >
          <FontAwesomeIcon className="icon" icon="house" /> Dashboard
        </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "nav-link-active search" : "search"
            }
          >
            <FontAwesomeIcon className="icon" icon="binoculars" />
            Search
          </NavLink>
          <NavLink
            to="/manager"
            className={({ isActive }) =>
              isActive ? "nav-link-active manager" : "manager"
            }
          >
            <FontAwesomeIcon className="icon" icon="list-check" />
            Manager
          </NavLink>
        </div>
        <div className="main-login-wrapper">
          <Auth id="login" className="login" />
        </div>
      </div>
    </div>
  );
};

export default NavigationComponent;
