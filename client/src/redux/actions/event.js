import axios from "axios";
import { server } from "../../server";

// create Event
export const createEvent =
  (
    newForm
    // name,
    // description,
    // category,
    // tags,
    // price,
    // dPrice,
    // stock,
    // shopId,
    // images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "eventCreateRequest",
      });

      const config = {headers:{"Content-Type":"multipart/form-data"}}

      const { data } = await axios.post(
        `${server}/event/create-event`,
        newForm,
        // name,
        // description,
        // category,
        // tags,
        // price,
        // dPrice,
        // stock,
        // shopId,
        // images,
        config
      );
      dispatch({
        type: "eventCreateSuccess",
        payload: data.event,
      });
    } catch (error) {
      dispatch({
        type: "eventCreateFail",
        payload: error.response.data.message,
      });
    }
  };


  //get shop event by id 
  export const getAllEventsShop = (id) => async (dispatch) =>{
    try {
      dispatch({type: "getAllEventRequest"})

      const { data } = await axios.get(`${server}/event/get-shop-events/${id}`)
      dispatch({type:"getAllEventRequestSuccess",payload:data.events})      
    } catch (error) {
      dispatch({type:"getAllEventRequestFail",payload:error.response.data.message})      

    }


  }

