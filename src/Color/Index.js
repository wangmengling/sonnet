import React,{ Component } from "react";
import ColorList from "./ColorList";
import {ColorStore} from "../../stores";

export default () => (
    <ColorList store={ColorStore}/>
)