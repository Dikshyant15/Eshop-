import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading:true,
    orders:null,
    error:null
}

export const orderReducer = createReducer(initialState,{
    //get all order of shop 
    getAllOrderOfShopRequest:(state)=>{
        state.isLoading=true 
    },
    getAllOrdersOfShopSuccess:(state,action)=>{
        state.isLoading = false
        state.orders=action.payload
    },
    getAllOrdersOfShopFail:(state,action)=>{
        state.isLoading = false
        state.error=action.payload
    }
})