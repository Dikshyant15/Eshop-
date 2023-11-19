import { createReducer } from "@reduxjs/toolkit";

//(prevState,action)=>newState
const initialState = {
    isLoading: true,
    product: null,
    allProducts:null,
    error:null,
    success:false
}

export const productReducer = createReducer(initialState, {
    //new product create state 
    productCreateRequest: (state) => {
        state.isLoading = true
    },
    productCreateSuccess: (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.success = true;
    },
    productCreateFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = false;
    },
    //get all product of a shop state
    getAllProductRequest: (state) => {
        state.isLoading = false
    },
    getAllProductRequestSuccess: (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
    },
    getAllProductRequestFail: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },
    //delete product state
    deleteProductRequest: (state) => {
        state.isLoading = false
    },
    deleteProductSuccess: (state, action) => {
        state.isLoading = false
        state.message = action.payload
    },
    deleteProductFailed: (state, action) => {
        state.isLoading = false
        state.error = action.payload
    },
    // get all products
    getAllProductsRequest: (state) => {
        state.isLoading = true;
    },
    getAllProductsSuccess: (state, action) => {
        state.isLoading = false;
        state.allProducts = action.payload;
    },
    getAllProductsFailed: (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
    },

    clearErrors: (state) => {
        state.error = null;

    }


})