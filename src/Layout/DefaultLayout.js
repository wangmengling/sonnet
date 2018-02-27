import React, { Component } from 'react';
import {
    hashRouter,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import history from "../History";
import HeaderView from './HeaderView'
import Slider from './Slider'
import Breadcrumbs from "../Breadcaumd/Breadcaumds";
import './DefaultLayout.less'
import PrivateRoute from "../../utils/PrivateRoute";
import { UserStore } from "../../stores";
import { UserList } from '../User/index';
import { observer } from "mobx-react";
import { Menu, Icon, Layout } from 'antd';
import DefaultLayoutContent from "./DefaultLayoutContent";


const DefaultLayout = ({ component: Component, ...rest}) => {
    
    function logout() {
        UserStore.signOut();
    }

    return (
        // call some method/function that will validate if user is logged in
        
        <Route {...rest} render={matchProps => (
            UserStore.isLogin ? (
                <DefaultLayoutContent>
                    <Component {...matchProps} />
                </DefaultLayoutContent>
                // <div className='LayoutRoot'>
                //     <div  className="LayoutSider">
                //         <Slider 
                //         className='LayoutSider-a' 
                //         />
                //     </div>
                //     <div className="LayoutRight">
                //         <div className="LayoutHeader">
                //             <Header user={UserStore.userModel} logout={logout} switchSider={switchSider}/>
                //         </div>
                //         {/* <div className="LayoutBreadcrumb">
                //             <Breadcrumbs />
                //         </div> */}
                //         <div className="LayoutContent">
                //             <Component {...matchProps} />
                //         </div>
                //     </div>
                // </div>
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