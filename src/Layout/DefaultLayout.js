import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link
} from 'react-router-dom'
import Header from './Header'
import Sider from './Sider'
import './DefaultLayout.less'

const DefaultLayout = ({ component: Component, rest}) => {
    return (
        // call some method/function that will validate if user is logged in
        <Route {...rest} render={matchProps => (
            <div className='LayoutRoot'>
                <div  className="LayoutSider">
                    <Sider className='LayoutSider-a' />
                </div>
                <div className="LayoutRight">
                    <div className="LayoutHeader">
                        <Header />
                    </div>
                    <div className="LayoutContent">
                        <Component {...matchProps} />
                    </div>
                </div>
            </div>
        )} />
    )
};

// /**
//  * Class representing a route that checks if user is logged in.
//  * @extends Route
//  */
// class AuthRequiredRoute extends Route{
//     /**
//      * @example <AuthRequiredRoute path="/" component={Products}>
//      */
//       render() {
//           let component = super.render();
//           let {user, path} = this.props;
//           let match = this.state.match;
//           if (match) {
//               const authStore = new Auth();
//               if (authStore.isLoggedIn) {
//                   return component;
//               } else {
//                   return <Redirect to="/admin/login"></Redirect>;
//               }
//           } else {
//             return null;
//           }
//       }
  
//       isLogin() {
//            let userName = localStorage.getItem();
//            if(!userName.length > 0) {
//                return true;
//            }else {
//                return false;
//            }
//       }
//   }

export default DefaultLayout;