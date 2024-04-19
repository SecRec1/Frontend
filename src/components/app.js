import React, { Component } from "react";
import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../style/app.scss";

import NavigationComponent from "./navigation-container";
import AddRecord from "./pages/addnew";
import Home from "../components/pages/home";
import Scan from "../components/pages/Scan";
import Search from "../components/pages/Search";




export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="title">
          <h1>Maintanence Tracker</h1>
          <div>{moment().format('MMM DD , yyyy hh:mm')}</div>
        </div>
        
        <Router>
          <div>
            <NavigationComponent/>

            <Switch>
              <Route exact path="/" component={Home}/>
              {/* <Route path="Scan" component={Scan}/> */}
              {/* <Route path="Search" component={Search}/> */}
              <Route path="Add" component={AddRecord}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
