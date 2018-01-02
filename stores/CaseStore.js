import React from "react";
import { observable, computed, action, autorun } from "mobx";
import { browserHistory } from 'react-router-dom';
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import { message } from "antd";
const JWT_SECRET = "sonnet";
class CaseStore {
    /**
   * Observable properties.
   * @property {map} caseModel - User info.
   */
    @observable caseModel = {};

    @observable loading: boolean = false;

    @observable addLoading: boolean = false;
    @observable visible: boolean = false;

    history = {};

    /**
     * UserList
     */
    @observable caseList = [];
    @observable searchParams = {};
    @observable pageIndex = 0;
    @observable pageCount = 0;
    @observable count = 0;
    /**
   * @constructor
   */
    constructor (history) {
        this.history = history;
    }

    @action list() {
        this.loading = true;
        console.log(this.searchParams);
        this.searchParams["pageIndex"] = this.pageIndex;
        this.searchParams["pageSize"] = this.pageSize;
        Fetch.post(API.api.user.list,this.searchParams).then((response) => {
            let data = response.data;
            console.log(data);
            if (data.code == 1 && data.data) {
                this.caseList = data.data["list"];
                this.pageCount = data.data["pageCount"];
                this.count = data.data["count"];
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
    @action caseAdd(params) {
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
    @action caseDelete(params) {
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
export default  new CaseStore();