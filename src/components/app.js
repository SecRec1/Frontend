import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../style/app.scss";
import Icons from "../components/helpers/icons";

import NavigationComponent from "./navigation-container";

import Home from "../components/pages/home";
import Scan from "../components/pages/Scan";
import SpecsManager from "../components/pages/specs-manager";
import Header from "../components/header";
import Search from "../components/pages/search";
import SpecsPage from "../components/pages/specs-page";






export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

   
  }
  
  render() {
    return (
      <div className="app">
        
        <Header/>
        <Router>
          <div className="nav">
            <NavigationComponent />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/Scan" component={Scan} />
              <Route path="/Search" component={Search} />
              <Route path="/SpecsManager" component={SpecsManager} />
              <Route path="/Specs/:sn" component={SpecsPage} />
            </Switch>
          </div>
        </Router>
        
      </div>
    );
  }
}
