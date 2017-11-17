import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './App';
import About from './About';
import Login from './Login/Login';
import Register from './Register/Register';
import DefaultLayout from "./Layout/DefaultLayout";

const Routes = () => (
    <Router>
      <div>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={App}/>
        <Route exact path="/about" component={About}/>
        
        <DefaultLayout exact path="/register" component={Register}/>
      </div>
    </Router>
  )

  export default Routes;