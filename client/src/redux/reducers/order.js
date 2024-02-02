import {createReducer} from "@reduxjs/toolkit"

const initialState = {
    isLoading:true,
    orders:null,
    error:null,
    allOrders:null
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
    },
    //get all order of user
    getAllOrderOfUserRequest:(state)=>{
        state.isLoading=true 
    },
    getAllOrdersOfUserSuccess:(state,action)=>{
        state.isLoading = false
        state.orders=action.payload
    },
    getAllOrdersOfUserFail:(state,action)=>{
        state.isLoading = false
        state.error=action.payload
    },
    //get all order for admin
    getAllOrderForAdminRequest:(state)=>{
        state.isLoading=true 
    },
    getAllOrderForAdminSuccess:(state,action)=>{
        state.isLoading = false
        state.allOrders=action.payload
    },
    getAllOrderForAdminFail:(state,action)=>{
        state.isLoading = false
        state.error=action.payload
    }
})