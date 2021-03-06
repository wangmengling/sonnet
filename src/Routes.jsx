import React from 'react'
import {
  Router,
  // BrowserRouter as Router,
  Route,
  Link,
    Redirect,
  hashRouter
} from 'react-router-dom'
import history from "./History";
import App from './App';
import About from './About';
import Login from './Login/index';
import Register from './Register/Register';
import DefaultLayout from "./Layout/DefaultLayout";
import PrivateRoute from "../utils/PrivateRoute";
import DashBoard from "./DashBoard/DashBoard"
import UserList from "./User/index";
import Role from "./Role/index";
import {caseList,caseAdd,CaseDetail} from "./Case/index";
import CaseCategoryList from "./CaseCategory/index"
import ColorList from "./Color/index";
import StyleList from "./Style/index";


import CaseAdd from "./Case/CaseAdd";
import UserStore from "../stores/UserStore";
const location = history.location;
const unlisten = history.listen((location,action) => {
  console.log(action,location.pathname,location.state);
})
const Routes = () => (
    // <Router history={hashRouter}>
    <Router history={history}> 
      <div>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" render={() => (
            UserStore.isLogin ? (
                <Redirect to="/dashBoard"/>
            ) : (
                <Redirect to="/login"/>
            )
        )} />
        <Route exact path="/about" component={About}/>
        
        <DefaultLayout exact path="/register" component={Register}/>
        <DefaultLayout exact path="/dashBoard" component={DashBoard}/>
        <DefaultLayout exact path="/user/list" component={UserList}/>
        <DefaultLayout exact path="/role/list" component={Role}/>
        <DefaultLayout exact path="/case/list" component={caseList}/>
        <DefaultLayout exact path="/case/add" component={caseAdd}/>
        <DefaultLayout exact path="/case/update" component={caseAdd}/>
        <DefaultLayout exact path="/case/detail" component={CaseDetail} />
        <DefaultLayout exact path="/caseCategory/list" component={CaseCategoryList} />
        <DefaultLayout exact path="/style/list" component={StyleList} />
        <DefaultLayout exact path="/color/list" component={ColorList} />
      </div>
    </Router>
  )

  export default Routes;