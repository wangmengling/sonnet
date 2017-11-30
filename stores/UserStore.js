import React from "react";
import { observable, computed, action, autorun } from "mobx";
import { browserHistory } from 'react-router-dom';
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import { message } from "antd";
const JWT_SECRET = "sonnet";
class UserStore {
    /**
   * Observable properties.
   * @property {map} userModel - User info.
   */
    @observable userModel = {};

    @observable loading: boolean = false;

    history = {};

    /**
   * @constructor
   */
    constructor (history) {
        // super();
        
        // const token = Storage.get('token');
        // if (token) {
        //     this.userModel = jwt.verify(token, JWT_SECRET);
        // }
        this.history = history;
        this.userModel = localStorage.getItem("userModel");
        // console.log(this.userModel);
    }

    @action login(userName,password) {
        this.loading = true;
        Fetch.post(API.api.user.login,{
              username: userName,
              password: password
        }).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                localStorage.setItem("token",data.data.token);
                this.userModel = data.data;
                localStorage.setItem("userModel",this.userModel);
            }
            this.loading = false;
            message.info(data.message);
        }).catch((error) => {
            this.loading = false;
            message.info(error.message);
            console.log(error);
        });
    }

    @action signOut() {
        localStorage.removeItem("token");
        this.userModel = {};
    }

    @computed get isLogin() {
        return localStorage.getItem("userModel") != null;
    }

    @computed get loginCompleted() {
        return this.userModel && this.userModel.token != null;
    }

    runAutorun() {
        autorun(() => {
            
        });
    }
}
export default  new UserStore();
