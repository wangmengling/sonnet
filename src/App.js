import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Link to="about">
        <p className="App-intro">
          To get started, edits <code>src/App.js</code> and save to reload.
        </p>
        </Link>
      </div>
    );
  }
}

export default App;
