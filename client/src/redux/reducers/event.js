import { createReducer } from "@reduxjs/toolkit";

//(prevState,action)=>newState
const initialState = {
    isLoading: true,
    event: null,
    allEvent:null,
    error:null,
    success:false
}

export const eventReducer = createReducer(initialState, {
    //new event create state 
    eventCreateRequest: (state) => {
        state.isLoading = true
    },
    eventCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
        state.success = true;
    },
    eventCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    //get all event state
    getAllEventRequest: (state) => {
        state.isLoading = false
    },
    getAllEventRequestSuccess: (state, action) => {
        state.isLoading = false;
        state.event = action.payload;
    },
    getAllEventRequestFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    //delete event state
    deleteEventRequest: (state) => {
        state.isLoading = false
    },
    deleteEventSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload
    },
    deleteEventFailed: (state, action) => {
        state.isLoading = false
        state.error = action.payload
    },
    // get all events
    getAllEventsRequest: (state) => {
        state.isLoading = true;
    },
    getAllEventsSuccess: (state, action) => {
        state.isLoading = false;
        state.allEvent = action.payload;
    },
    getAllEventsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;

    }


})