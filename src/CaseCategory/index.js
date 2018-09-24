import React,{ Component } from "react";
import CaseCategoryList from "./CaseCategoryList";
import {CaseCategoryStore} from "../../stores";

export default () => (
    <CaseCategoryList store={CaseCategoryStore}/>
)