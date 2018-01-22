import BaseStore from "./BaseStore";
import { observable, computed, action, autorun } from "mobx";
import API from "../config/API.config";
class CaseCategoryStore extends BaseStore{
    constructor() {
        super();
    }

    @action list() {
        super.list(API.api.caseCategory.list);
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
}
export default new CaseCategoryStore();