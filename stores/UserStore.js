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

    @observable addLoading: boolean = false;
    @observable visible: boolean = false;

    history = {};

    /**
     * UserList
     */
    @observable userList = [];
    @observable searchParams = {};
    @observable pageIndex = 0;
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
        // return localStorage.getItem("token") != null;
        console.log(localStorage.getItem("token"));
        return true;
    }

    @computed get loginCompleted() {
        return this.userModel && this.userModel.token != null;
    }

    @action list() {
        this.loading = true;
        console.log(this.searchParams);
        this.searchParams["pageIndex"] = this.pageIndex;
        this.searchParams["pageSize"] = 10;
        Fetch.post(API.api.user.list,this.searchParams).then((response) => {
            let data = response.data;
            console.log(data);
            if (data.code == 1 && data.data) {
                this.userList = data.data["list"];
                console.log(data.data.list);
            }
            this.loading = false;
        }).catch((error) => {
            this.loading = false;
            message.info(error.message);
            console.log(error);
        });
    }

    // 新增用户
    @action userAdd(params) {
        this.addLoading = true;
        console.log(params);
        Fetch.post(API.api.user.add,params).then((response) => {
            let data = response.data;
            console.log(data);
            if (data.code == 1 && data.data) {
                console.log(data.data);
                this.visible = false
                this.list();
            }
            message.info(data.message);
            this.addLoading = false;
        }).catch((error) => {
            this.addLoading = false;
            message.info(error.message);
            console.log(error);
            this.visible = false
        });
    }

    // 新增用户
    @action userDelete(params) {
        this.addLoading = true;
        console.log(params);
        Fetch.post(API.api.user.delete,params).then((response) => {
            let data = response.data;
            console.log(data);
            if (data.code == 1 && data.data) {
                this.visible = false
            }
        }).catch((error) => {
            this.addLoading = false;
        });
    }

    @computed get getAddLoading() {
        return this.addLoading;
    }
}
export default  new UserStore();
