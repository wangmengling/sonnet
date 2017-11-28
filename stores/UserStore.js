import { observable, computed, action, autorun } from "mobx";
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
import { message } from "antd";
class UserStore {
    /**
   * Observable properties.
   * @property {map} userModel - User info.
   */
    @observable userModel = {};

    @observable loading: boolean = false;
    // @computed get loading(): boolean { 
    //     return this.loading; 
    // }

    /**
   * @constructor
   */
    constructor () {
        this.runAutorun();
    }

    @action login(userName,password) {
        this.loading = true;
        Fetch.post(API.api.user.login,{
            data:{
              username: userName,
              password: password
            }
        }).then((response) => {
            let data = response.data;
            this.messageTest = data.message;
            this.loginStatus = data.code;
            if (data.code == 1 && data.data) {
                this.userModel = data.data;
            }
            this.loading = false;
            console.log(response);
        }).catch((error) => {
            this.loading = false;
            console.log(error);
        });
    }

    runAutorun() {
        autorun(() => {
            if (this.loading) {
                message.loading('Action in progress..', 0);
            }else {
                // message.destroy();
            }
        });
    }
}
export default  new UserStore();
