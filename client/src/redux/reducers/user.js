import { createReducer } from "@reduxjs/toolkit";

//(prevState,action)=>newState
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    usersLoading: false,
    users: null,
    addressloading: false,
    successMessage: ""

}

//load users
export const userReducer = createReducer(initialState, {
    LoadUsersRequest: (state) => {
        state.loading = true
    },
    LoadUserSuccess: (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
    },
    LoadUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
    },
    // update user information
    updateUserInfoRequest: (state) => {
        state.loading = true;
    },
    updateUserInfoSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
    },
    updateUserInfoFailed: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // update user address info 
    updateUserAddressRequest: (state) =>{
        state.addressloading =true
    },
    updateUserAddressRequestSuccess: (state,action)=>{
        state.addressloading = false
        state.successMessage = action.payload.successMessage;
        state.user = action.payload.user
    },
    updateUserAddressFailed: (state, action) => {
        state.addressloading = false;
        state.error = action.payload;
      },
    //delete user address 
    deleteUserRequest:(state)=>{
        state.addressloading =true
    } ,
    deleteUserRequestSuccess:(state,action)=>{
        state.addressloading = false
        state.successMessage = action.payload.successMessage;
        state.user = action.payload.user

    },
    deleteUserRequestFail:(state,action)=>{
        state.addressloading =true
    },
    //admin get all users
    getAllUsersRequest: (state) => {
        state.usersLoading = true;
    },
    getAllUsersSuccess: (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
    },
    getAllUsersFailed: (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
    },
    clearErrors: (state) => {
        state.error = null;
    },
    clearMessages: (state) => {
        state.successMessage = null;
    },
})
