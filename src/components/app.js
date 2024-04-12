import React, {Component} from 'react';

import "../style/app.scss";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="title"><h1>Maintanence Tracker</h1>
        </div>
        <div className="Button_container">
        <div className="Equipment_container">
          <div className="Code">QRCode</div>
          <div className="Name">Equipment Name</div>
        </div>
        <div className="Specs_container">
          <button className='Equipment button'>Equipment Specs</button>
        </div>
        <div className="Overdue_container">
          <button className="Overdue button">Overdue Maint</button>
        </div>
        <div className="Due_container">
          <button className="Due button">Maint due within 7 days</button>
          </div>
        <div className="Upcoming_container">
          <button className="Upcoming button">Upcoming Maint within 30 days</button>
          </div>
        </div>        
      </div>
    );
  }
}
