import React,{ Component } from "react";
import StyleList from "./StyleList";
import {StyleStore} from "../../stores";

export default () => (
    <StyleList store={StyleStore}/>
)