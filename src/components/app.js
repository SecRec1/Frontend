import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Styles from "../style/app.scss";
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

import Lockimg from "../../static/assets/images/lockimg.png";
import Loading from "./loading";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true, // Flag to indicate whether the app is still loading
    };

    Icons();
  }
  componentDidMount() {
    // Simulate loading time with setTimeout, for example purposes
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000); // Assume 2 seconds of loading time
  }

  render() {
    const Emblem = {
      backgroundImage: `url(${Lockimg})`,
      backgroundSize: "350px 600px",
      backgroundPosition: "bottom",
      backgroundRepeat: "no-repeat",
      
    };
    if (this.state.loading) {
      // Display the loader if the app is still loading
      return <Loading />;
    }
    return (
      <div className="app" style={Emblem}>
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
