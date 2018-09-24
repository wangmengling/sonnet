import React from 'react';
import Login from "./Login";
import { UserStore } from "../../stores";


// export
export default  () => (
    <Login store={UserStore} />
)