
import React,{Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashRouter,
  Redirect
} from 'react-router-dom';
import { message } from 'antd';
import { setTimeout } from 'timers';

const fakeAuth = {
    // isAuthenticated: localStorage.getItem("token"),
    isAuthenticated: true,
    authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}/>
        )
    )}/>
  ) 
 }

export default PrivateRoute;