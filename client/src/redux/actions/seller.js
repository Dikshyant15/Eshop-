import axios from "axios"
import {server} from '../../server'

// load seller
export const loadSeller = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadSellerRequest",
      });
      const { data } = await axios.get(`${server}/shop/get-seller`, {
        withCredentials: true,
      });
      dispatch({
        type: "LoadSellerSuccess",
        payload: data.seller,
      });
    } catch (error) {
      dispatch({
        type: "LoadSellerFail",
        payload: error.response.data.message,
      });
    }
  };

  //admin get all sellers
  export const getAllSellersAdmin = () => async(dispatch) =>{
    try {
      dispatch({
        type: "getAllSellersRequest"
      })
      const {data} = await axios.get(`${server}/shop/admin-get-all-seller`,{withCredentials:true})
      dispatch({
        type: "getAllSellersSuccess",
        payload: data.adminAllSeller
      })
    } catch (error) {
      dispatch({
        type: "getAllSellerFailed",
        payload: error.response.data.message,
      });
      
    }
  }