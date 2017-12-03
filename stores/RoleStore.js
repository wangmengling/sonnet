import { observable, computed, action } from "mobx";
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import { message } from "antd";
class RoleStore {
    @observable visible:boolean = false;
    @observable addLoading:boolean = false;
    @observable loading:boolean = false;
    @observable roleList = new Array();

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

    @action roleUpdate(name) {

    }
}
export default new RoleStore();
    