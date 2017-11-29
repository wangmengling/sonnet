import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

class About extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/About.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default withRouter(About);
