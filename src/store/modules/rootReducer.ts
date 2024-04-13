import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./user/users.slice";
import taskSlice from "./task/task.slice";
import userLoginSlice from "./user/user.login.slice";


export default combineReducers({
    users: usersSlice,
    userLogin: userLoginSlice,
    tasks: taskSlice
})