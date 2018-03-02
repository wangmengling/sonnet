import React,{ Component } from "react";
import CaseList from "./CaseList";
import CaseAdd from "./CaseAdd";
import CaseDetail from "./CaseDetail";
// import UserStore from "../../stores/UserStore";
import {CaseStore, StyleStore, ColorStore, UserStore, UploadStore} from "../../stores";

// export default () => (
//   <CaseList store={CaseStore} />,
// )

var caseList = () => (
  <CaseList store={CaseStore} />
)

var caseAdd = () => (
  <CaseAdd store={CaseStore} styleStore={StyleStore} colorStore={ColorStore} userStore={UserStore} uploadStore={UploadStore}/>
)

export {
  caseAdd,
  caseList,
  CaseDetail
}