import BaseStore from "./BaseStore";
import Fetch from "../utils/Fetch";
import { message } from "antd";
import { observable, computed, action, autorun } from "mobx";
import API from "../config/API.config";
class CaseStore  extends BaseStore{

    @observable current = 0; //当前步骤
    @observable isNext = false;
    @observable hasMore = false;

    constructor() {
        super();
    }

    @action list() {
        super.list(API.api.case.list);
        console.log(this.dataList);
    }

    @action add(name) {
        super.add(API.api.caseCategory.add,{name:name});
    }

    @action update(name,_id) {
        super.update(API.api.caseCategory.update,{_id:_id,name:name});
    }

    @action delete(_id) {
        super.delete(API.api.caseCategory.delete,{_id:_id});
    }

    // 新增
    @action caseAddBase(params) {
        this.addLoading = true;
        console.log(params);
        Fetch.post(API.api.case.addBase,params).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                this.detailData = data.data;
                this.current = 1;
            }
            this.addLoading = false;
        }).catch((error) => {
            this.addLoading = false;
            message.info(error.message);
            console.log(error);
        });
    }

    // 新增
    @action updateImageUrl(params) {
        this.addLoading = true;
        Fetch.post(API.api.case.updateImageUrl,params).then((response) => {
            let data = response.data;
            if (data.code == 1 && data.data) {
                this.detailData = data.data;
                this.current = 3;
            }
            this.addLoading = false;
        }).catch((error) => {
            this.addLoading = false;
            message.info(error.message);
            console.log(error);
        });
    }

    @computed get getCurrent() {
        return this.current;
    }
}
export default  new CaseStore();