import { observable, computed, action } from "mobx";
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import { message } from "antd";
class RoleStore {
    @observable visible:boolean = false;
    @observable addLoading:boolean = false;
    @observable loading:boolean = false;
    @observable roleList = new Array();
    @observable updateRole = {};

    @action roleAdd(name) {
        this.addLoading = true;
        Fetch.post(API.api.role.add,{
              name: name
        }).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                this.roleList.push(data.data);
                this.visible = false;
            }
            message.info(data.message);
            this.addLoading = false;
        }).catch((error) => {
            // this.visible = false;
            this.addLoading = false;
            message.info(error.message);
        });
    }

    @action getRoleList() {
        this.loading = true;
        Fetch.post(API.api.role.list,{
              name: name
        }).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                this.roleList = data.data;
            }
            this.loading = false;
        }).catch((error) => {
            // this.visible = false;
            this.loading = false;
            message.info(error.message);
        });
    }

    @action roleUpdate(name,_id) {
        this.addLoading = true;
        Fetch.post(API.api.role.update,{
              name: name,
              _id:_id
        }).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                this.visible = false;
                this.updateRole = {};
            }
            message.info(data.message);
            this.addLoading = false;
            this.getRoleList();
        }).catch((error) => {
            this.addLoading = false;
            message.info(error.message);
        });
    }

    @action roleDelete(index,_id) {
        this.addLoading = true;
        console.log(_id);
        Fetch.post(API.api.role.delete,{
              _id:_id
        }).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                this.visible = false;
            }
            message.info(data.message);
            this.addLoading = false;
            this.getRoleList();
        }).catch((error) => {
            this.addLoading = false;
            message.info(error.message);
        });
    }

    @computed get getVisible() {
        return this.visible;
    }
}
export default new RoleStore();
    