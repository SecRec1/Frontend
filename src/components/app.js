import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../style/app.scss";
import Icons from "../components/helpers/icons";

import NavigationComponent from "./navigation-container";

import Home from "../components/pages/home";
import Scan from "../components/pages/Scan";
import Search from "../components/pages/Search";
import Header from "../components/header";
import SpecsDetail from "./detail-page/specs-details";
import Specs from "../components/pages/specs";




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
              <Route path="/S/:slug" component={Specs} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
