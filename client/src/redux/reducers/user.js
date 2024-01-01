import { createReducer } from "@reduxjs/toolkit";

//(prevState,action)=>newState
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    usersLoading: false,
    users: null
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
