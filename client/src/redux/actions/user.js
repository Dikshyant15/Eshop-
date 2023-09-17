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


