import { createReducer } from "@reduxjs/toolkit";

//(prevState,action)=>newState
const initialState = {
    isAuthenticated: false
}

export const userReducer = createReducer(initialState,{
    LoadUsersRequest:(state)=>{
        state.loading = true
    },
    LoadUserSuccess: (state,action)=>{
        state.loading = false;
        state.isAuthenticated= true;
        state.error = action.payload;
    },
    LoadUserFail: (state,action)=>{
        state.loading = false;
        state.isAuthenticated= false;
        state.error = action.payload;
    }




})