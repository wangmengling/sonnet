import React,{ Component } from "react";
import UserList from "./UserList";

// import UserStore from "../../stores/UserStore";
import { RoleStore,UserStore } from "../../stores";

// const UserLists = <UserList store={UserStore} />;
// export {
//   UserList,
// }

export default () => (
  <UserList store={UserStore} roleStore={RoleStore}/>
)