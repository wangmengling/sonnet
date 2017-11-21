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
const DefaultLayout = ({ component: Component, ...rest}) => {
    return (
        // call some method/function that will validate if user is logged in
        <PrivateRoute {...rest} render={matchProps => (
            <div className='LayoutRoot'>
                <div  className="LayoutSider">
                    <Sider className='LayoutSider-a' />
                </div>
                <div className="LayoutRight">
                    <div className="LayoutHeader">
                        <Header />
                    </div>
                    <div className="LayoutBreadcrumb">
                        <Breadcrumbs />
                    </div>
                    <div className="LayoutContent">
                        <Component {...matchProps} />
                    </div>
                </div>
            </div>
        )} />
    )
};

export default DefaultLayout;