import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import Header from './Header'
import Sider from './Sider'
import Breadcrumbs from "../Breadcaumd/Breadcaumds";
import './DefaultLayout.less'
import PrivateRoute from "../../utils/PrivateRoute";
import UserStore from "../../stores/UserStore";
import { UserList } from '../User/index';

const DefaultLayout = ({ component: Component, ...rest}) => {
    return (
        // call some method/function that will validate if user is logged in
        
        <Route {...rest} render={matchProps => (
            UserStore.isLogin ? (
                <div className='LayoutRoot'>
                    <div  className="LayoutSider">
                        <Sider className='LayoutSider-a' />
                    </div>
                    <div className="LayoutRight">
                        <div className="LayoutHeader">
                            <Header user={UserStore.userModel} logout={UserStore.signOut}/>
                        </div>
                        <div className="LayoutBreadcrumb">
                            <Breadcrumbs />
                        </div>
                        <div className="LayoutContent">
                            <Component {...matchProps} />
                        </div>
                    </div>
                </div>
              ) : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: matchProps.location }
                }}/>
              )
        )} />
    )
};
export default DefaultLayout;