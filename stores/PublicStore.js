import React from "react";
import { observable, computed, action, autorun } from "mobx";
class PublicStore {
    @observable sliderCollapsed = true;
    @observable sliderSelectCurrent = "1";
    @observable sliderItemSelectCurrent = ["1"];
}

export default  new PublicStore();