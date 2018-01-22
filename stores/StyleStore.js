import BaseStore from "./BaseStore";
import { observable, computed, action, autorun } from "mobx";
import API from "../config/API.config";
class StyleStore extends BaseStore{
    constructor() {
        super();
    }

    @action list() {
        super.list(API.api.style.list);
    }

    @action add(name) {
        super.add(API.api.style.add,{name:name});
    }

    @action update(name,_id) {
        super.update(API.api.style.update,{_id:_id,name:name});
    }

    @action delete(_id) {
        super.delete(API.api.style.delete,{_id:_id});
    }
}
export default new StyleStore();