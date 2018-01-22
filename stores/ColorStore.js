import BaseStore from "./BaseStore";
import { observable, computed, action, autorun } from "mobx";
import API from "../config/API.config";
class ColorStore extends BaseStore{
    constructor() {
        super();
    }

    @action list() {
        super.list(API.api.color.list);
    }

    @action add(name) {
        super.add(API.api.color.add,{name:name});
    }

    @action update(name,_id) {
        super.update(API.api.color.update,{_id:_id,name:name});
    }

    @action delete(_id) {
        super.delete(API.api.color.delete,{_id:_id});
    }
}
export default new ColorStore();