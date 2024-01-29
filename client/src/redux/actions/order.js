import axios from "axios";
import { server } from "../../server";

export const getAllOrderOfShop =(shopId)=>async(dispatch)=>{
    try {
        dispatch({
          type: "getAllOrderOfShopRequest",
        })
        const { data } = await axios.get(`${server}/order/get-shop-orders/${shopId}`)
        dispatch({type:"getAllOrdersOfShopSuccess",payload:data.orders})
      } catch (error) {
        dispatch({
          type: "getAllOrdersOfShopFail",
          payload: error.response.data.message
        })
      }
}
export const getAllOrdersOfUser =(userId)=>async(dispatch)=>{
    try {
        dispatch({
          type: "getAllOrderOfUserRequest",
        })
        const { data } = await axios.get(`${server}/order/get-shop-orders/${userId}`)
        dispatch({type:"getAllOrdersOfUserSuccess",payload:data.orders})
      } catch (error) {
        dispatch({
          type: "getAllOrdersOfUserFail",
          payload: error.response.data.message
        })
      }
}