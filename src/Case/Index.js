import React,{ Component } from "react";
import CaseList from "./CaseList";

// import UserStore from "../../stores/UserStore";
import {CaseStore} from "../../stores";

export default () => (
  <CaseList store={CaseStore} />
)