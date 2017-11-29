import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashRouter
} from 'react-router-dom'
import App from './App';
import About from './About';
import Login from './Login/Index';
import Register from './Register/Register';
import DefaultLayout from "./Layout/DefaultLayout";
import PrivateRoute from "../utils/PrivateRoute";
import DashBoard from "./DashBoard/DashBoard"
import { UserList } from "./User";
import Role from "./Role";
const Routes = () => (
    <Router history={hashRouter}>
      <div>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={App}/>
        <Route exact path="/about" component={About}/>
        
        <DefaultLayout exact path="/register" component={Register}/>
        <DefaultLayout exact path="/dashBoard" component={DashBoard}/>
        <DefaultLayout exact path="/user/list" component={UserList}/>
        <DefaultLayout exact path="/role/list" component={Role}/>
      </div>
    </Router>
  )

  export default Routes;