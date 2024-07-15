import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../style/app.scss";
import Icons from "../components/helpers/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationComponent from "./navigation-container";

import Home from "../components/pages/home";
import Scan from "./pages/Scan";
import SpecsManager from "../components/pages/specs-manager";
import Header from "../components/header";
import Search from "../components/pages/search";
import SpecsPage from "../components/pages/specs-page";
import Manager from "./pages/manager";
import TaskManager from "./task-manager";
import TaskPage from "../components/pages/task-page";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Router>
          <div className="nav">
            <NavigationComponent />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Scan" component={Scan} />
              <Route path="/Search" component={Search} />
              <Route path="/Manager" component={Manager} />
              <Route path="/Specs/:sn" component={SpecsPage} />
              <Route path="/Task/:id" component={TaskPage} />
              <Route path="/Manager/Specsmanager" component={SpecsManager} />
              <Route path="/Manager/Taskmanager" component={TaskManager} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
