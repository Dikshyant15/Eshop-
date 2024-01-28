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