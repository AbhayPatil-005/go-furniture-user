import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoggedIn : !!localStorage.getItem("token"),
    token : localStorage.getItem("token") || null,
    userEmail:localStorage.getItem("email") || null,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login(state, action){
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.userEmail = action.payload.email;
            localStorage.setItem("token",action.payload.token);
            localStorage.setItem("email",action.payload.email);
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
            state.userEmail=null;
            localStorage.clear();
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;