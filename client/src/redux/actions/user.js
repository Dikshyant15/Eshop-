import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

//update user information 
export const updateUserInformation = (name, email, phoneNumber, password) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest"
    })
    const { data } = await axios.put(`${server}/user/update-user-info`, { name, email, phoneNumber, password }, {
      withCredentials: true, headers: {
        "Access-Control-Allow-Credentials": true,
      },
    })
    dispatch({
      type: "updateUserInfoSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    });
  }
}

//admin get all users
export const adminGetAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersRequest"
    })

    const { data } = await axios.get(`${server}/user/admin-get-all-user`, { withCredentials: true })
    dispatch({
      type: "getAllUsersSuccess",
      payload: data.adminAllUser
    })


  } catch (error) {
    dispatch({
      type: "getAllUsersFailed",
      payload: error.response.data.message,
    });
  }

}

//update user info 
export const updateUserAddress = (city, country, addressType, address1, address2, zipCode) => async (dispatch) => {
  try {
    dispatch({
      type: " updateUserAddressRequest",
    })
    const { data } = await axios.put(`${server}/user/update-user-address`, { city, country, addressType, address1, address2, zipCode }, {
      withCredentials: true, headers: {
        "Access-Control-Allow-Credentials": true,
      },
    })
    dispatch({
      type: " updateUserAddressRequestSuccess",
      payload: data.user
    })



  } catch (error) {
    dispatch({
      type: "updateUserAddressFailed",
      payload: error.response.data.message,
    });

  }
}

//delete user address 
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: " deleteUserRequest",
    })
    const { data } = await axios.delete(`${server}/user/delete-user-address/${id}`, {
      withCredentials: true, headers: {
        "Access-Control-Allow-Credentials": true,
      },
    })
    dispatch({
      type: " deleteUserRequestSuccess",
      payload: data.user
    })

  } catch (error) {
    dispatch({
      type: "deleteUserRequestFail",
      payload: error.response.data.message,
    });
  }
}
//admin get all order
export const getAllOrdersForAdmin =()=>async(dispatch)=>{
  try {
      dispatch({
        type: "getAllOrderForAdminRequest",
      })
      const { data } = await axios.get(`${server}/user/admin-get-all-order`)
      dispatch({type:"getAllOrderForAdminSuccess",payload:data.allOrders})
    } catch (error) {
      dispatch({
        type: "getAllOrderForAdminFail",
        payload: error.response.data.message
      })
    }
}
