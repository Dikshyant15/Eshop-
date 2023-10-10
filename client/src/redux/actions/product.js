import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
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
          type: "productCreateRequest",
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } }

        const { data } = await axios.post(
          `${server}/product/create-product`,
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
          type: "productCreateSuccess",
          payload: data.product,
        });
      } catch (
        error) {
        dispatch({
          type: "productCreateFail",
          payload: error.response.data.message,
        });
      }
    };

//get product of a shop by id 
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductRequest",
    })
    const { data } = await axios.get(`${server}/product/get-shop-products/${id}`)
    dispatch({type:"getAllProductRequestSuccess",payload:data.products})
  } catch (error) {
    dispatch({
      type: "getAllProductRequestFail",
      payload: error.response.data.message
    })
  }
}

