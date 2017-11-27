import { observable, computed, action } from "mobx";
import API from "../config/API.config";
import Fetch from "../utils/Fetch";
class UserStore {
    /**
   * Observable properties.
   * @property {map} userModel - User info.
   */
    @observable userModel = {};

    /**
   * @constructor
   */
    constructor () {
      
    }
    
    @action login() {
        
    }
}
export default  new UserStore();