import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styles from "../style/app.scss";
import Icons from "../components/helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "regenerator-runtime/runtime";

import NavigationComponent from "./navigation-container";

import Home from "./pages/home";
import Scan from "./pages/Scan";
import SpecsManager from "./pages/specs-manager";
import Header from "./header";
import Search from "./pages/search";
import SpecsPage from "./pages/specs-page";
import Manager from "./pages/manager";
import TaskManager from "./task-manager";
import TaskPage from "./pages/task-page";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="nav">
          <NavigationComponent />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/search" element={<Search />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/Specs/:sn" element={<SpecsPage />} />
            <Route path="/Task/:id" element={<TaskPage />} />
            <Route path="/manager/specsmanager" element={<SpecsManager />} />
            <Route path="/manager/taskmanager" element={<TaskManager />} />
          </Routes>
        </div>
      </div>
    );
  }
}
